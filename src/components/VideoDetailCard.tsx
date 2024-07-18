import Image from 'next/image';

const VideoCard = ({ data }:{data:any}) => {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image 
            className="h-48 w-full object-cover md:w-48" 
            src={data.author.avatar} 
            alt={data.author.nickname} 
            width={200}
            height={200}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.author.nickname}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{data.desc}</p>
          <div className="mt-2 text-gray-500">
            <div>❤️ {data.statistics.likeCount}</div>
            <div>💬 {data.statistics.commentCount}</div>
            <div>🔗 {data.statistics.shareCount}</div>
          </div>
          <div className="mt-4">
          <a 
              href={data.video}
              download
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Without watermark
            </a>
            <a 
              href={data.video}
              download
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Without watermark HD
            </a>
            <a 
              href={data.music}
              download
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Download MP3
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
