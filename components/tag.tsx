import useGetRandomBackgrounds from "@/hooks/useGetRandomBackground";
import { useState } from "react";

interface TagProps {
  content: string;
}

export default function Tag({ content }: TagProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  
  // 배경색 목록  
  const backgrounds = [
    'bg-background-grey',
    'bg-background-yellow',
    'bg-background-green',
    'bg-background-kiwi',
    'bg-background-purple',
    'bg-background-pink',
    'bg-background-sky',
  ];
  const currentBackground = useGetRandomBackgrounds({ backgrounds });
  return (
<button 
  className={`max-w-[150px] w-auto h-auto px-5 py-2 rounded-lg text-[#2b2b2b]
  active:opacity-80 ${currentBackground} cursor-pointer 
  overflow-hidden whitespace-nowrap text-ellipsis`}
  
  title={content}
  >
  {content}
</button>


  )
}