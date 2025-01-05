"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X, Clipboard, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const clearInput = () => {
    setUrl("");
    setVideoData(null);
    setSelectedResolution("");
    setShowAlert(false);
    setDownloadProgress(0);
  };

  const getYoutubeVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1);
      } else if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v");
      }
      throw new Error("Invalid YouTube URL");
    } catch (error: any) {
      console.error("Error extracting video ID:", error.message);
      return null;
    }
  };

  // useEffect(() => {
  //   try {
  //     const DownloadFuncIiIs = async () =>{

  //       const response = await fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}`);
  //       if (!response.ok) throw new Error("Failed to download video");
        
  //       const blob = await response.blob();
  //       const downloadUrl = URL.createObjectURL(blob);
        
  //       const a = document.createElement("a");
  //       a.href = downloadUrl;
  //       a.download = "video.mp4";
  //       a.click();
        
  //       URL.revokeObjectURL(downloadUrl);
  //     }
  //     DownloadFuncIiIs()
  //   } catch (error:any) {
  //     console.error("Error:", error.message);
  //   }
  //   // fetch(
  //   //   "http://localhost:3000/download?url=https://youtu.be/_PyQ-g7XaM8?si=Y_4RIVqVUotBc81o"
  //   // )
  //   //   .then((data) => {
  //   //     console.log("done ", data.body); // Handle the response data
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("Error: ", err); // Handle any errors
  //   //   });
  // }, [url]);

  const fetchVideoData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/get-video-info', { url: url });
      console.log(response);
  } catch (error:any) {
      console.error('Error fetching video info:', error);
  }
    try {
      const videoId = getYoutubeVideoId(url);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyAxhx9ES-b93uiqYcyiyzfkAqY8ZKlb4JE`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      try {
        const response = await fetch("/api/save-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoUrl: url }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage("Video and thumbnail saved successfully!");
        } else {
          setMessage(data.error || "Failed to save video and thumbnail.");
        }
      } catch (error) {
        console.error(error);
        setMessage("An unexpected error occurred.");
      }
      const data = await response.json();
      setVideoData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  async function handleDownload() {
    const videoUrl = url || "";
    const videoId = getYoutubeVideoId(url)
    const apiEndpoint = `/api/download?url=${encodeURIComponent(videoUrl)}`;
  
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }
  
      // Create a downloadable link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoId}.mp4`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error:any) {
      console.error(error.message);
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          YouTube Video Downloader
        </h1>
        <a href="/videoyoutube.mp4" download>
          Download Video
        </a>
        <a href="/imageyoutube.jpg" download>
          Download Image
        </a>

        <div className="relative">
          <Input
            type="text"
            placeholder="Paste YouTube URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-20"
          />
          {url ? (
            <Button
              onClick={clearInput}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="icon"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handlePaste}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="icon"
              variant="ghost"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          onClick={fetchVideoData}
          className="w-full mt-4"
          disabled={!url || loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Proceed"
          )}
        </Button>
        {loading && <p className="text-center mt-4">Loading video data...</p>}
        {showAlert && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred. Please check the URL and try again.
            </AlertDescription>
          </Alert>
        )}
        {videoData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              {videoData.snippet.title}
            </h2>
            <p className="mb-4 line-clamp-2">{videoData.snippet.description}</p>
            <div className="aspect-video mb-4">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData.id}`}
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="flex space-x-4">
              <Select onValueChange={setSelectedResolution}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360p">360p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleDownload}
                disabled={!selectedResolution || isDownloading}
                className="flex-1"
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
            </div>
            {isDownloading && (
              <Progress value={downloadProgress} className="mt-4" />
            )}
            <p className="text-sm text-gray-500 mt-4">
              Note: Please ensure you have the right to download and use this
              content. Respect copyright laws and YouTubes terms of service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
