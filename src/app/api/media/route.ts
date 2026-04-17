import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'photos';
  
  const directory = type === 'photos' 
    ? path.join(process.cwd(), 'public/media/GAllERy')
    : path.join(process.cwd(), 'public/media/videos');

  try {
    if (!fs.existsSync(directory)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(directory).filter(f => !f.startsWith('.'));
    return NextResponse.json(files);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'photos';
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const directory = type === 'photos' 
      ? path.join(process.cwd(), 'public/media/GAllERy')
      : path.join(process.cwd(), 'public/media/videos');

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const filePath = path.join(directory, file.name);
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(filePath, buffer);
    
    return NextResponse.json({ success: true, fileName: file.name });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('name');
    const type = searchParams.get('type') || 'photos';

    if (!fileName) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    const directory = type === 'photos' 
      ? path.join(process.cwd(), 'public/media/GAllERy')
      : path.join(process.cwd(), 'public/media/videos');

    const filePath = path.join(directory, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
