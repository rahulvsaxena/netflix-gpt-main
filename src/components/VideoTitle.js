import { FaPlay } from "react-icons/fa";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-5 text-lg w-2/4">{overview}</p>
      <div className="flex items-center space-x-2 my-4 md:m-0">
  <button className="bg-white text-black py-1 md:py-2 px-3 md:px-8 text-xl rounded-lg hover:bg-opacity-80 flex items-center space-x-2">
    <FaPlay />
    <span>Play</span>
  </button>
  <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-2 px-6 text-xl bg-opacity-50 rounded-lg">
    More Info
  </button>
</div>

    </div>
  );
};
export default VideoTitle;
