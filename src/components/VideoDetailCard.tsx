import Image from "next/image";
type Author = {
  avatar: string;
  nickname: string;
};

type Statistics = {
  likeCount: string;
  commentCount: string;
  shareCount: string;
};

type CardProps = {
  author: Author;
  desc: string;
  stats: Statistics;
  music: string;
  video: string;
};

const VideoCard = ({ author, desc, stats, music, video }: CardProps) => {
  console.log(' asdfa ',{ author, desc, stats, music, video } )
  return (
    <div className="bg-purple-700 max-w-[1000px] mx-auto mt-5 p-2 rounded-lg shadow-lg text-white ">
      <div className="flex">
        <div className="flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.nickname}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="ml-2">
          <h2 className="text-sm md:text-xl font-bold">{author.nickname}</h2>
          <p className="text-xs md:text-sm">{desc}</p>
        </div>
      </div>
      <div className="mt-4 max-w-[100%]">
        <a href={video} download>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
          >
            Without watermark
          </button>
        </a>
        <a  href={music} download>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Download MP3
          </button>
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
