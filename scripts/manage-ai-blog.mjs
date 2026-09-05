import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const getArg = (flag) => {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
};

const action = getArg('--action'); // 'publish' | 'delete' | 'discard'
const targetId = getArg('--id');

if (!action || !targetId) {
  console.error('Usage: node scripts/manage-ai-blog.mjs --action [publish|delete|discard] --id <id>');
  process.exit(1);
}

async function publishBlog(id) {
  console.log(`\n🚀 Publishing AI Draft "${id}" to Live Website as DV Editorial Team...\n`);

  // Read queue
  const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
  const queueModule = await import(`file://${queuePath}`);
  const queue = queueModule.aiBlogQueue || [];

  const draft = queue.find((item) => item.id === id || item.slug === id);
  if (!draft) {
    throw new Error(`Draft ID "${id}" not found in AI Queue.`);
  }

  // Read blogMeta.ts
  const metaPath = join(rootDir, 'src', 'data', 'blogMeta.ts');
  let metaContent = await readFile(metaPath, 'utf8');

  // Determine next blog-N ID
  const matches = [...metaContent.matchAll(/id:\s*"blog-(\d+)"/g)];
  const maxId = matches.length > 0 ? Math.max(...matches.map((m) => parseInt(m[1], 10))) : 28;
  const newBlogId = `blog-${maxId + 1}`;

  const newMetaItem = `  { id: "${newBlogId}", slug: "${draft.slug}", title: "${draft.title.replace(/"/g, '\\"')}", excerpt: "${draft.excerpt.replace(/"/g, '\\"')}", date: "${draft.date}", author: "DV Editorial Team", image: "${draft.image}", readTime: "${draft.readTime}", isAiGenerated: true },\n];`;

  metaContent = metaContent.replace(/\s*\];\s*$/, `\n${newMetaItem}\n`);
  await writeFile(metaPath, metaContent, 'utf8');

  // Read blogsData.ts
  const dataPath = join(rootDir, 'src', 'data', 'blogsData.ts');
  let dataContent = await readFile(dataPath, 'utf8');

  const newPostObject = {
    id: newBlogId,
    title: draft.title,
    excerpt: draft.excerpt,
    date: draft.date,
    author: 'DV Editorial Team',
    image: draft.image,
    readTime: draft.readTime,
    sections: draft.sections,
  };

  const formattedPost = JSON.stringify(newPostObject, null, 2);
  dataContent = dataContent.replace(/\s*\];\s*$/, `,\n${formattedPost}\n];`);
  await writeFile(dataPath, dataContent, 'utf8');

  // Update draft status in queue
  let rawQueueText = await readFile(queuePath, 'utf8');
  rawQueueText = rawQueueText.replace(`"id": "${draft.id}"`, `"id": "${draft.id}", "publishedBlogId": "${newBlogId}"`);
  rawQueueText = rawQueueText.replace(`"status": "pending"`, `"status": "published"`);
  await writeFile(queuePath, rawQueueText, 'utf8');

  console.log(`✅ Success! Published live as "${newBlogId}" (${draft.title}) under DV Editorial Team.`);

  console.log(`\n⚙️ Running static SEO & Sitemap generator...\n`);
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  console.log(`\n🎉 Done! Published live and pre-rendered in static HTML.\n`);
}

async function deleteBlog(id) {
  console.log(`\n🗑️ Deleting Blog "${id}" from Live Site and Data Files...\n`);

  // Remove from blogMeta.ts
  const metaPath = join(rootDir, 'src', 'data', 'blogMeta.ts');
  let metaContent = await readFile(metaPath, 'utf8');
  const metaRegex = new RegExp(`\\s*\\{\\s*id:\\s*"${id}"[\\s\\S]*?\\},?`, 'g');
  metaContent = metaContent.replace(metaRegex, '');
  await writeFile(metaPath, metaContent, 'utf8');

  // Remove from blogsData.ts
  const dataPath = join(rootDir, 'src', 'data', 'blogsData.ts');
  let dataContent = await readFile(dataPath, 'utf8');
  const dataRegex = new RegExp(`\\s*\\{\\s*"id":\\s*"${id}"[\\s\\S]*?\\},?`, 'g');
  dataContent = dataContent.replace(dataRegex, '');
  await writeFile(dataPath, dataContent, 'utf8');

  // Remove from queue if present
  const queuePath = join(rootDir, 'src', 'data', 'aiBlogQueue.ts');
  let queueContent = await readFile(queuePath, 'utf8');
  const queueRegex = new RegExp(`\\s*\\{\\s*"id":\\s*"${id}"[\\s\\S]*?\\},?`, 'g');
  queueContent = queueContent.replace(queueRegex, '');
  await writeFile(queuePath, queueContent, 'utf8');

  console.log(`✅ Successfully removed "${id}" from codebase.`);

  console.log(`\n⚙️ Rebuilding static SEO & Sitemap...\n`);
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  console.log(`\n🎉 Done! Deleted and sitemap updated.\n`);
}

try {
  if (action === 'publish') {
    await publishBlog(targetId);
  } else if (action === 'delete' || action === 'discard') {
    await deleteBlog(targetId);
  } else {
    console.error(`Unknown action "${action}"`);
  }
} catch (err) {
  console.error('❌ Error executing manage-ai-blog script:', err);
  process.exit(1);
}
