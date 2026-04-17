import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prisma = getPrisma();
    await prisma.inquiry.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
