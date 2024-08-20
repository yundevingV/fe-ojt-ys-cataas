import useGetRandomBackgrounds from "@/hooks/useGetRandomBackground";

interface TagProps {
  content: string;
  size? : string;
}

export default function Tag({ content, size }: TagProps) {
  
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

  // 동적 크기를 위한 클래스 설정
  const sizeClass = size === 'small' ? 'text-sm px-3 py-1' :
                    size === 'search' ? 'text-[11px] px-2 py-1' : 
                    'text-base px-5 py-2'; // 기본 크기

  return (
    // md:text-base md:px-5 md:py-2 
<button 
  className={`max-w-[150px] w-auto h-auto px-5 py-2 rounded-lg text-[#2b2b2b]
  active:opacity-80 ${currentBackground} cursor-pointer 
  overflow-hidden whitespace-nowrap text-ellipsis ${sizeClass} 
  `}
  
  title={content}
  >
  {content}
</button>


  )
}
