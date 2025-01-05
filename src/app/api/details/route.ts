import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    // Execute yt-dlp to fetch video details
    const { stdout, stderr } = await execPromise(`yt-dlp -j ${url}`);

    if (stderr) {
      console.error("Error:", stderr);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    // Parse the JSON response
    const info = JSON.parse(stdout);

    // Extract useful details
    const details = {
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      formats: info.formats.map((format: any) => ({
        quality: format.quality,
        itag: format.itag,
        container: format.container,
        hasAudio: !!format.audio_bitrate,
        hasVideo: !!format.quality,
      })),
    };

    return NextResponse.json(details);
  } catch (error: any) {
    console.error("Error fetching video details:", error);
    return NextResponse.json({ error: "Failed to fetch video details." }, { status: 500 });
  }
}
