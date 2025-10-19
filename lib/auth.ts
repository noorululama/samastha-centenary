import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'admin_session';

export interface AuthResult {
  success: boolean;
  message?: string;
}

export function validateCredentials(username: string, password: string): AuthResult {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return { success: true };
  }
  return { success: false, message: 'Invalid username or password' };
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  // Create a simple session token (in production, use proper JWT or session management)
  const sessionToken = Buffer.from(`${Date.now()}`).toString('base64');
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
