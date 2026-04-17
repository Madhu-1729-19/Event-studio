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

export async function GET() {
  try {
    const prisma = getPrisma();
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const { id, ...data } = body;
    
    if (data.marriageDate) {
      data.marriageDate = new Date(data.marriageDate);
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(inquiry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
