import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = getPrisma();
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements } = body;

    const booking = await prisma.booking.create({
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift,
        time,
        payment,
        requirements
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
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

    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
