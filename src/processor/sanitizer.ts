import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const win = typeof window === 'undefined' ? (new JSDOM('')).window : window;
const dp = createDOMPurify(win);

export const { sanitize } = dp;
