import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '_'); // Sanitize title
    const stream = ytdl(videoUrl, { format: 'mp4' });

    return new Response(stream, {
      headers: {
        'Content-Disposition': `attachment; filename="${videoTitle}.mp4"`,
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}
