export const PORT = process.env.PORT || 8000;
export const SESSION_SECRET = process.env.SESSION_SECRET || '0123456789';
export const __DEV__ = process.env.NODE_ENV === 'development';
export const COOKIE_NAME = 'just_a_cookie';
export const CORS_ORIGIN =
  (process.env.CORS_ORIGIN as string) || 'http://localhost:3000';
