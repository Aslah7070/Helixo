import { Commet } from "react-loading-indicators";

export default function Loader() {
  return (
    <div className="flex justify-center text-white items-center h-screen">


      <Commet color="white" size="medium" text="" textColor="" />
    </div>
  );
}



interface HorizontalLoaderProps {
  height?: string;
  color?: string;
}

export const HorizontalLoader: React.FC<HorizontalLoaderProps> = ({
  height = "4px",
  color = "#32cd32",
}) => {
  return (
    <div className="w-full bg-gray-200 overflow-hidden rounded">
      <div
        className="animate-loading-bar"
        style={{
          height,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};


