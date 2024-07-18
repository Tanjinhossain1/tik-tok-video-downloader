"use client";

import VideoCard from "@/components/VideoDetailCard";
import Image from "next/image";
import { useState } from "react";

// import { download } from 'rahad-all-downloader';
const { v1, v2, v3, v4, stalk } = require("node-tiklydown");
export default function Home() {
  const [data, setData] = useState<any>(null);
  const SubmitHandler = async (e:any) => {
    e.preventDefault();
    const url = e.target.url.value;
    try {
      v3(url).then((data:any) => {
        // Do something with the data
        console.log("first ", data);
        setData(data);
      });
    } catch (error:any) {
      console.error("Error:", error.message);
    }
  };
  return (
    <>
      {/* <input type="text" name="url" placeholder="Enter URL" />
      <button type="submit">Download</button>  */}
      <form onSubmit={SubmitHandler}>
        <div className=" flex flex-col">
          {/* <header className="bg-white shadow-sm"> */}
            <div className="container mx-auto p-4 flex items-center justify-between">
              <div className="flex items-center">
                {/* <Image src="/logo.png" alt="SSSTIK" width={40} height={40} /> */}
                <span className="ml-2 font-semibold text-xl">TikTok Safari</span>
              </div>
              <nav className="flex space-x-4">
                <a href="#" className="text-gray-700 hover:text-black">
                  Contact us
                </a> 
              </nav>
            </div>
          {/* </header> */}
          <main className="min-h-[500px] flex-grow w-full p-5 flex  justify-center bg-gradient-to-r from-[#271869] to-[#3614e0]">
            <div className="text-center w-full">
              <h1 className="text-white text-3xl font-bold mb-3">
               Download Tik Tok Video
              </h1>
              <h2 className="text-white text-3xl font-bold mb-6">
              without watermark
              </h2>
              <div className="relative mx-auto w-full max-w-[800px]">
                <input
                  type="text"
                  placeholder="Just insert a link"
                  className="w-full h-[65px] rounded-md py-4 px-6 text-gray-700 bg-gradient-to-r from-purple-200 to-[#ccc2ff] p-10 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button className="bg-white  hover:bg-blue-700 text-[#4f409c]  rounded-md font-bold py-2 px-4 mr-2">
                    Paste
                  </button>
                  <button className="bg-gradient-to-r to-[#271869] from-[#3614e0]   mr-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
      {data ? <VideoCard data={data?.result} /> : null}
    </>
  );
}
