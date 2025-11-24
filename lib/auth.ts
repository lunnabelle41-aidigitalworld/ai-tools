import { sign, verify } from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';
import { User, UserWithoutPassword } from '@/types/user';
import { NextApiRequest } from 'next';

const COOKIE_NAME = 'auth-token';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '30d';

// Type for cookie options
interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
  path: string;
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(user: UserWithoutPassword): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
  
  return token;
}

export async function setAuthCookie(token: string): Promise<void> {
  // This function is not used in API routes
  throw new Error('setAuthCookie should not be called in API routes');
}

export async function removeAuthCookie(): Promise<void> {
  // This function is not used in API routes
  throw new Error('removeAuthCookie should not be called in API routes');
}

export async function getCurrentUser(req: NextApiRequest): Promise<UserWithoutPassword | null> {
  try {
    const token = req.cookies[COOKIE_NAME];
    
    if (!token) return null;
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return payload as UserWithoutPassword;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function verifyToken(token: string): Promise<UserWithoutPassword | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as UserWithoutPassword;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}
