import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'connected', database: 'postgresql' });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message,
      hint: 'Check if DATABASE_URL is set in Vercel environment variables and if the database is linked.'
    }, { status: 500 });
  }
}
