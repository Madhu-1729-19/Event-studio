import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const inquiries = db.prepare('SELECT * FROM Inquiry ORDER BY id DESC').all();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const { brideName, bridegroomName, phoneNumber, marriageDate, noteForGift } = await request.json();
    
    const stmt = db.prepare(`
      INSERT INTO Inquiry (brideName, bridegroomName, phoneNumber, marriageDate, noteForGift)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(brideName, bridegroomName, phoneNumber, marriageDate, noteForGift || null);
    const inquiry = db.prepare('SELECT * FROM Inquiry WHERE id = ?').get(result.lastInsertRowid);

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = getDb();
    const { id, brideName, bridegroomName, phoneNumber, marriageDate, noteForGift } = await request.json();
    
    db.prepare(`
      UPDATE Inquiry SET brideName=?, bridegroomName=?, phoneNumber=?, marriageDate=?, noteForGift=?
      WHERE id=?
    `).run(brideName, bridegroomName, phoneNumber, marriageDate, noteForGift || null, id);

    const inquiry = db.prepare('SELECT * FROM Inquiry WHERE id = ?').get(id);
    return NextResponse.json(inquiry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
