"use client";

import VideoCard from "@/components/VideoDetailCard";
import Image from "next/image";
import { useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ClearIcon from "@mui/icons-material/Clear";
const { v1, v2, v3, v4, stalk } = require("node-tiklydown");

export default function TopDownloaderField() {
  const [data, setData] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const SubmitHandler = async (e: any) => {
    e.preventDefault();
    const url = e.target.url.value;
    try {
      setIsLoading(true);
      v3(url)
        .then((data: any) => {
          // Do something with the data
          console.log("first ", data);
          if (data?.result?.status === "error") {
            if (
              data?.result?.message.includes(
                "your link is not a valid TikTok link"
              )
            ) {
              alert("This Link is Incorrect. Please Correct Your Link ");
            }
          }
          if (
            data?.result?.author?.nickname &&
            data?.result?.author?.nickname !== ""
          ) {
            setData(data);
          }
          setIsLoading(false);
        })
        .catch((err: any) => {
          if (err?.message === "Network Error") {
            alert(
              "Your Internet Too Slow. Please Check you internet connection"
            );
          }
          setIsLoading(false);
          console.log(err?.message);
        });
    } catch (error: any) {
      setIsLoading(false)
      console.error("Error:", error.message);
    }
  };
  console.log("data  ", data);
  return (
    <>
      <div className=" flex flex-col">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="ml-2 font-semibold text-xl">TikTok Safari</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-black">
              Contact us
            </a>
          </nav>
        </div>
        <main className="min-h-[500px] flex-grow w-full p-5 flex  justify-center bg-gradient-to-r from-[#271869]  to-[#3614e0] last:bg-red-600">
          <div className="text-center w-full">
            <h1 className="text-white text-3xl font-bold mb-3">
              Download Tik Tok Video
            </h1>
            <h2 className="text-white text-3xl font-bold mb-6">
              Without watermark
            </h2>
            <form onSubmit={SubmitHandler}>
              <div className="relative mx-auto w-full max-w-[1000px]">
                <input
                  name="url"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Just insert a link"
                  className="w-full h-[65px] rounded-md py-4 px-6 text-gray-700 bg-gradient-to-r from-purple-200 to-[#ccc2ff] p-10 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  {inputValue === "" ? (
                    <button
                      type="button"
                      className="bg-white   text-[#4f409c]  rounded-md font-bold py-2 px-4 mr-2"
                      onClick={handlePaste}
                    >
                      <ContentPasteIcon sx={{ fontSize: 16 }} /> Paste
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-white   text-[#4f409c]  rounded-sm text-sm font-bold p-2 mr-2"
                      onClick={() => setInputValue("")}
                    >
                      <ClearIcon sx={{ fontSize: 16 }} /> Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-gradient-to-r to-[#271869] from-[#3614e0] hidden md:flex  mr-2  text-white font-bold py-4 px-4 rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r to-[#271869] from-[#3614e0] flex md:hidden w-full mt-2 border-white border   mr-2  text-white font-bold py-4 px-4 rounded-lg"
              >
                Download
              </button>
            </form>
            {data ? (
              <VideoCard
                author={data.result.author}
                desc={data.result.desc}
                stats={data.result.statistics}
                video={data?.result.video}
                music={data?.result.music}
              />
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
}
