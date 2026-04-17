import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift } = body;

    const inquiry = await prisma.inquiry.create({
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift,
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
