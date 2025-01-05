import TopDownloaderField from "@/components/TopDownloadField";
import Link from "next/link";
export default function Home() {
   
  return (
    <>
       {/* <TopDownloaderField /> */}
       <Link href={'/video/downloader/tiktok'} >Tik tok</Link>
       <Link href={'/video/downloader/youtube'} >You Tube</Link>
    </>
  );
}
