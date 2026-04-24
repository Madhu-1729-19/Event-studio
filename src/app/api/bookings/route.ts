import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements } = await request.json();
    
    const booking = await prisma.booking.create({
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift: noteForGift || null,
        time: time || null,
        payment: payment || null,
        requirements: requirements || null,
      }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements } = await request.json();
    
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        brideName,
        bridegroomName,
        phoneNumber,
        marriageDate: new Date(marriageDate),
        noteForGift: noteForGift || null,
        time: time || null,
        payment: payment || null,
        requirements: requirements || null,
      }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
