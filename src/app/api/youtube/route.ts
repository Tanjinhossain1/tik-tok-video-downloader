import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);

    const qualities = info.formats
      .filter((format) => format.qualityLabel)
      .map((format) => ({
        itag: format.itag,
        format: format.container,
        resolution: format.qualityLabel,
        url: format.url,
      }));

    return NextResponse.json({ qualities });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
