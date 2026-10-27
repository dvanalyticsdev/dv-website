import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { MongoClient } from 'mongodb';

const PORT = Number(process.env.PORT || 4317);
const DATABASE_NAME = 'website_lead_tracking';
const COLLECTION_NAME = 'submissions';
const CONFIG_PATH = '/var/www/website-lead-tracking-api/config.json';
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const DASHBOARD_PIN = String(process.env.DASHBOARD_PIN || config.dashboardPin || '');
const ALLOWED_ORIGINS = new Set([
  'https://dvanalyticsmds.com', 'https://www.dvanalyticsmds.com',
  'https://dvanalyticsmds.in', 'https://www.dvanalyticsmds.in',
  'http://localhost:5173', 'http://127.0.0.1:5173',
]);
const sessions = new Map();

const readMongoUri = () => {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const line = fs.readFileSync('/var/www/i-crm/.env', 'utf8').split(/\r?\n/).find((item) => item.startsWith('MONGODB_URI='));
  return line ? line.slice('MONGODB_URI='.length).trim().replace(/^['"]|['"]$/g, '') : '';
};
const mongoUri = readMongoUri();
if (!mongoUri || !DASHBOARD_PIN) throw new Error('Dashboard API configuration is incomplete.');
const client = new MongoClient(mongoUri);
let submissions;

const originHeaders = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'null',
  'Access-Control-Allow-Credentials': 'true',
});
const send = (res, status, body, origin) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...originHeaders(origin) });
  res.end(JSON.stringify(body));
};
const readBody = (req) => new Promise((resolve, reject) => {
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; if (raw.length > 100_000) reject(new Error('Request body too large.')); });
  req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Invalid JSON.')); } });
  req.on('error', reject);
});
const pinMatches = (pin) => String(pin || '') === DASHBOARD_PIN;
const getSession = (req) => {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  const expiresAt = sessions.get(token);
  if (!token || !expiresAt || expiresAt < Date.now()) { sessions.delete(token); return false; }
  return true;
};
const normalizeSubmission = (input = {}) => ({
  submissionId: String(input.id || input.submissionId || '').trim() || `server_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
  timestamp: String(input.timestamp || new Date().toISOString()), createdAt: new Date(),
  displayTime: String(input.displayTime || ''), name: String(input.name || '').trim().slice(0, 200),
  email: String(input.email || '').trim().slice(0, 320), phone: String(input.phone || '').trim().slice(0, 60),
  course: String(input.course || '').trim().slice(0, 300), formType: String(input.formType || '').trim().slice(0, 80),
  formLabel: String(input.formLabel || '').trim().slice(0, 160), pageUrl: String(input.pageUrl || '').trim().slice(0, 2_000),
  pagePath: String(input.pagePath || '').trim().slice(0, 500), pageCategory: String(input.pageCategory || '').trim().slice(0, 80),
  pageCategoryLabel: String(input.pageCategoryLabel || '').trim().slice(0, 160), qualification: String(input.qualification || '').trim().slice(0, 200),
  experience: String(input.experience || '').trim().slice(0, 120), state: String(input.state || '').trim().slice(0, 160), brochurePath: String(input.brochurePath || '').trim().slice(0, 500),
});

const handler = async (req, res) => {
  const origin = String(req.headers.origin || '');
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...originHeaders(origin), 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS' });
    return res.end();
  }
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  try {
    if (req.method === 'GET' && url.pathname === '/healthz') return send(res, 200, { ok: true }, origin);
    if (req.method === 'POST' && url.pathname === '/api/dashboard/auth') {
      const body = await readBody(req);
      if (!pinMatches(body.pin)) return send(res, 401, { message: 'Invalid dashboard PIN.' }, origin);
      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, Date.now() + 8 * 60 * 60 * 1000);
      return send(res, 200, { ok: true, token }, origin);
    }
    if (url.pathname !== '/api/dashboard/submissions') return send(res, 404, { message: 'Not found.' }, origin);
    if (req.method === 'POST') {
      const submission = normalizeSubmission(await readBody(req));
      if (!submission.name && !submission.email && !submission.phone) return send(res, 400, { message: 'Submission identity is required.' }, origin);
      await submissions.updateOne({ submissionId: submission.submissionId }, { $set: submission }, { upsert: true });
      return send(res, 201, { ok: true, submissionId: submission.submissionId }, origin);
    }
    if (!getSession(req)) return send(res, 401, { message: 'Dashboard login required.' }, origin);
    if (req.method === 'GET') {
      const search = String(url.searchParams.get('search') || '').trim();
      const query = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { phone: new RegExp(search, 'i') }, { course: new RegExp(search, 'i') }, { pagePath: new RegExp(search, 'i') }, { state: new RegExp(search, 'i') }] } : {};
      return send(res, 200, { ok: true, submissions: await submissions.find(query).sort({ createdAt: -1 }).limit(20_000).toArray() }, origin);
    }
    if (req.method === 'DELETE') return send(res, 200, { ok: true, deleted: (await submissions.deleteMany({})).deletedCount }, origin);
    return send(res, 405, { message: 'Method not allowed.' }, origin);
  } catch (error) {
    console.error('[website-lead-tracking]', error);
    return send(res, 500, { message: 'Dashboard API failed.' }, origin);
  }
};

await client.connect();
submissions = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
await submissions.createIndex({ submissionId: 1 }, { unique: true, name: 'submissionId_unique' });
await submissions.createIndex({ createdAt: -1 }, { name: 'createdAt_desc' });
http.createServer(handler).listen(PORT, '127.0.0.1', () => console.log(`Website lead tracking API listening on ${PORT}`));
