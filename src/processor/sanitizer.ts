import createDOMPurify from 'dompurify';

const dp = createDOMPurify(window);
export const { sanitize } = dp; 
