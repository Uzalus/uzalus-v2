import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

const ALLOWED_FILES = [
  'UZALUS_V2_SansVideo.zip',
  'video_hero.zip',
  'UZALUS_V2_Complet.zip',
];

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get('file');

  if (!filename || !ALLOWED_FILES.includes(filename)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const filePath = join(process.cwd(), 'public', filename);
    const fileStat = await stat(filePath);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileStat.size.toString(),
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
