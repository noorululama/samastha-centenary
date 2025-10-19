import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const result = validateCredentials(username, password);

    if (result.success) {
      await createSession();
      return NextResponse.json({ success: true, message: 'Login successful' });
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Login failed', error: error.message },
      { status: 500 }
    );
  }
}
