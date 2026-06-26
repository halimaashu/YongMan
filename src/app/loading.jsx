import { BeatLoader, ClipLoader, HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      
     <BeatLoader
  color="#23dfd6"
  cssOverride={{}}
  loading
  margin={10}
  size={20}
  speedMultiplier={2}
/>
    </div>
  );
};

export default Loading;