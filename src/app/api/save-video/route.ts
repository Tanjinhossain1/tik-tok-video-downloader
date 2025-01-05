import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
  }

  try {
    const ytdlProcess = spawn('yt-dlp', [
      '-f', 'mp4', // Format: mp4
      '-o', '-',   // Output to stdout
      videoUrl,    // Video URL
    ]);

    const readableStream = new ReadableStream({
      start(controller) {
        ytdlProcess.stdout.on('data', (chunk) => {
          controller.enqueue(chunk);
        });
        ytdlProcess.stdout.on('end', () => {
          controller.close();
        });
        ytdlProcess.stdout.on('error', (err) => {
          console.error('Stream error:', err);
          controller.error(err);
        });
      },
    });

    ytdlProcess.stderr.on('data', (data) => {
      console.error('stderr:', data.toString());
    });

    ytdlProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp process exited with code ${code}`);
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Disposition': `attachment; filename="video.mp4"`,
        'Content-Type': 'video/mp4',
      },
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}
