import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const bookings = db.prepare('SELECT * FROM Booking ORDER BY id DESC').all();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements } = await request.json();
    
    const stmt = db.prepare(`
      INSERT INTO Booking (brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(brideName, bridegroomName, phoneNumber, marriageDate, noteForGift || null, time || null, payment || null, requirements || null);
    const booking = db.prepare('SELECT * FROM Booking WHERE id = ?').get(result.lastInsertRowid);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = getDb();
    const { id, brideName, bridegroomName, phoneNumber, marriageDate, noteForGift, time, payment, requirements } = await request.json();
    
    db.prepare(`
      UPDATE Booking SET brideName=?, bridegroomName=?, phoneNumber=?, marriageDate=?, noteForGift=?, time=?, payment=?, requirements=?
      WHERE id=?
    `).run(brideName, bridegroomName, phoneNumber, marriageDate, noteForGift || null, time || null, payment || null, requirements || null, id);

    const booking = db.prepare('SELECT * FROM Booking WHERE id = ?').get(id);
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
