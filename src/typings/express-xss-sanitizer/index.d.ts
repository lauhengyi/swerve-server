declare module 'express-xss-sanitizer' {
  import { RequestHandler } from 'express';
  const xss: (options?: object) => RequestHandler;
  export { xss };
}
