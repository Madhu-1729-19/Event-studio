import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift } = await request.json();
    
    const inquiry = await prisma.inquiry.create({
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift: noteForGift || null,
      }
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, brideName, bridegroomName, phoneNumber, marriageDate, noteForGift } = await request.json();
    
    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift: noteForGift || null,
      }
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
