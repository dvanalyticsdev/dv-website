/**
 * Shared Form Validation & Spam Prevention Utilities
 * Implements strict validation rules for Name, Indian Mobile Number, Email,
 * Optional Message length, and Bot Honeypot detection.
 */

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
export const EMAIL_MAX_LENGTH = 100;
export const PHONE_EXACT_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 500;

const FAKE_NAME_BLACKLIST = new Set([
  'test',
  'testing',
  'tester',
  'asdf',
  'asdfg',
  'asdfgh',
  'qwerty',
  'qwert',
  'zxcv',
  'zxcvb',
  'abcd',
  'abcde',
  'abcdef',
  'abc',
  'xyz',
  'fake',
  'dummy',
  'sample',
  'user',
  'admin',
  'none',
  'null',
  'undefined',
  'na',
  'n a',
  'nil',
  'demo',
  'temp',
  'anonymous',
  'unknown',
  'name',
  'fullname',
  'full name',
  'first last',
  'john doe',
  'jane doe',
]);

const FAKE_PHONE_BLACKLIST = new Set([
  '9999999999',
  '8888888888',
  '7777777777',
  '6666666666',
  '9876543210',
  '9123456789',
  '8765432109',
  '7654321098',
  '6543210987',
  '9000000000',
  '8000000000',
  '7000000000',
  '6000000000',
  '9999988888',
  '8888899999',
  '9898989898',
  '8989898989',
  '7878787878',
  '6767676767',
  '9090909090',
  '8080808080',
  '7070707070',
  '6060606060',
  '9191919191',
]);

const FAKE_EMAIL_LOCAL_BLACKLIST = new Set([
  'test',
  'testing',
  'asdf',
  'qwerty',
  'fake',
  'dummy',
  'abc',
  'xyz',
  '123',
  '1234',
  '12345',
  '123456',
  'admin',
  'none',
  'null',
]);

const FAKE_EMAIL_DOMAINS = new Set([
  'test.com',
  'example.com',
  'example.org',
  'example.net',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'fake.com',
  'asdf.com',
  'abc.com',
  'xyz.com',
]);

/**
 * Validates a full name field:
 * - No leading/trailing blank-only input
 * - Letters and spaces only (no numbers or unnecessary special characters)
 * - Reasonable min (2) and max (60) character limits
 * - Rejects obviously fake entries ("test", "asdf", repeated characters, etc.)
 */
export const validateName = (rawValue: string): string => {
  if (!rawValue || !rawValue.trim()) {
    return 'Full name is required.';
  }

  const trimmed = rawValue.trim();

  if (/\d/.test(trimmed)) {
    return 'Name must not contain numbers.';
  }

  if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(trimmed)) {
    return 'Name can only contain alphabets and single spaces (no special characters).';
  }

  const normalized = trimmed.replace(/\s+/g, ' ');

  if (normalized.length < NAME_MIN_LENGTH) {
    return `Name must be at least ${NAME_MIN_LENGTH} characters long.`;
  }

  if (normalized.length > NAME_MAX_LENGTH) {
    return `Name cannot exceed ${NAME_MAX_LENGTH} characters.`;
  }

  const lower = normalized.toLowerCase();
  const lettersOnly = lower.replace(/\s+/g, '');

  if (lettersOnly.length < NAME_MIN_LENGTH) {
    return `Name must contain at least ${NAME_MIN_LENGTH} letters.`;
  }

  // Reject single character repeated (e.g., "aaaa", "bbbb")
  if (/^([a-z])\1+$/i.test(lettersOnly)) {
    return 'Please enter a valid full name.';
  }

  // Reject 4+ identical consecutive characters (e.g., "aaaa")
  if (/(.)\1{3,}/i.test(lettersOnly)) {
    return 'Please enter a valid full name.';
  }

  // Reject if the whole name or individual words match common fake/test words
  if (FAKE_NAME_BLACKLIST.has(lower) || FAKE_NAME_BLACKLIST.has(lettersOnly)) {
    return 'Please enter your real name (test or placeholder entries are not allowed).';
  }

  const words = lower.split(' ');
  if (words.some((w) => FAKE_NAME_BLACKLIST.has(w))) {
    return 'Please enter your real name (test or placeholder entries are not allowed).';
  }

  // Reject keyboard mash patterns or names without any vowels (including 'y')
  if (!/[aeiouy]/i.test(lettersOnly)) {
    return 'Please enter a valid real name.';
  }

  return '';
};

/**
 * Validates an Indian mobile number:
 * - Accept exactly 10 digits
 * - Must start with 6, 7, 8, or 9
 * - Do not allow numbers starting with 0 or country code 91/+91
 * - Reject alphabets, special characters, spaces, and incomplete numbers
 * - Prevent obviously fake numbers (9999999999, 8888888888, 1234567890, etc.)
 */
export const validateIndianPhone = (rawValue: string): string => {
  if (!rawValue || !rawValue.trim()) {
    return 'Mobile number is required.';
  }

  // Reject spaces anywhere in the input
  if (/\s/.test(rawValue)) {
    return 'Mobile number must not contain spaces.';
  }

  // Reject alphabets
  if (/[a-zA-Z]/.test(rawValue)) {
    return 'Mobile number must contain digits only (no alphabets).';
  }

  // Specifically detect +91 or 0 prefix before generic special char check
  if (rawValue.startsWith('+91') || (rawValue.startsWith('91') && rawValue.length > 10)) {
    return 'Do not include country code (+91 or 91). Enter your 10-digit mobile number.';
  }

  if (rawValue.startsWith('0')) {
    return 'Mobile number must not start with 0. It must start with 6, 7, 8, or 9.';
  }

  // Reject any special characters (+, -, parentheses, dots, etc.)
  if (/[^0-9]/.test(rawValue)) {
    return 'Mobile number must contain digits only (no special characters or spaces).';
  }

  if (rawValue.length !== PHONE_EXACT_LENGTH) {
    return 'Please enter a valid 10-digit mobile number.';
  }

  if (!/^[6-9]\d{9}$/.test(rawValue)) {
    return 'Mobile number must start with 6, 7, 8, or 9 and be 10 digits.';
  }

  if (rawValue.startsWith('91')) {
    return 'Mobile number must not start with country code 91.';
  }

  // Check fake numbers:
  // 1. All 10 digits identical (e.g., 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(rawValue)) {
    return 'Please enter a valid, active mobile number.';
  }

  // 2. 7 or more identical consecutive digits (e.g., 9999999123, 9888888888)
  if (/(\d)\1{6,}/.test(rawValue)) {
    return 'Please enter a valid, active mobile number.';
  }

  // 3. Repeating 2-digit pair 5 times (e.g., 9898989898, 9090909090)
  if (/^(\d\d)\1{4}$/.test(rawValue)) {
    return 'Please enter a valid, active mobile number.';
  }

  // 4. Known sequential or dummy patterns
  if (FAKE_PHONE_BLACKLIST.has(rawValue)) {
    return 'Please enter a valid, active mobile number.';
  }

  // 5. Strict ascending or descending 8+ digit run
  const ascending = '01234567890';
  const descending = '98765432109';
  if (ascending.includes(rawValue.slice(0, 8)) || descending.includes(rawValue.slice(0, 8))) {
    return 'Please enter a valid, active mobile number.';
  }

  return '';
};

/**
 * Validates an email address:
 * - Rejects blank spaces
 * - Enforces proper email formatting (local@domain.tld)
 * - Rejects invalid, incomplete, or fake email addresses
 */
export const validateEmail = (rawValue: string): string => {
  if (!rawValue || !rawValue.trim()) {
    return 'Email address is required.';
  }

  if (/\s/.test(rawValue.trim())) {
    return 'Email address must not contain spaces.';
  }

  const trimmed = rawValue.trim();

  if (trimmed.length < 6 || trimmed.length > EMAIL_MAX_LENGTH) {
    return `Email address must be between 6 and ${EMAIL_MAX_LENGTH} characters.`;
  }

  // Strict RFC-like email format: local part + @ + domain with at least one dot and 2-24 char alphabetic TLD
  const emailRegex = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,24}$/;

  if (!emailRegex.test(trimmed) || trimmed.includes('..')) {
    return 'Please enter a valid and complete email address (e.g., name@domain.com).';
  }

  const [localPart, domainPart] = trimmed.toLowerCase().split('@');

  if (FAKE_EMAIL_LOCAL_BLACKLIST.has(localPart)) {
    return 'Please enter a valid personal or work email address.';
  }

  if (FAKE_EMAIL_DOMAINS.has(domainPart)) {
    return 'Please enter a valid email address (temporary or test domains are not allowed).';
  }

  // Reject single-letter repeated local part like "aaaa@gmail.com"
  if (localPart.length >= 4 && /^([a-z0-9])\1+$/i.test(localPart)) {
    return 'Please enter a valid email address.';
  }

  return '';
};

/**
 * Validates optional message field for max character limit and non-whitespace-only content.
 */
export const validateOptionalMessage = (rawValue: string): string => {
  if (!rawValue) return '';
  if (rawValue.length > 0 && !rawValue.trim()) {
    return 'Message cannot consist of blank spaces only.';
  }
  if (rawValue.trim().length > MESSAGE_MAX_LENGTH) {
    return `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters.`;
  }
  return '';
};

/**
 * Returns true if the hidden honeypot field was filled (indicating an automated bot).
 */
export const isHoneypotTriggered = (honeypotValue: string): boolean => {
  return Boolean(honeypotValue && honeypotValue.trim().length > 0);
};
