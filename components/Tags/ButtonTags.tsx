import Link from "next/link";

interface ButtonTagsProps {
  content: string;
  textColor?: string;
  hover: string;
  active: string;
  onClick?: () => void; // 클릭 핸들러
  isActive?: boolean; // 클릭 상태
}

export default function ButtonTags({ content, textColor, hover, active, onClick, isActive }: ButtonTagsProps) {
  return (
    // <Link href={`result/?q=${content}`}>
    <button
      className={`w-auto flex-row h-10 px-4 py-0 cursor-pointer font-semibold items-center border-2 border-transparent	
      rounded-3xl ${textColor} ${hover} ${active}
      opacity-60 ${isActive ? 'bg-slate-200 border-2 border-sky-400' : ''}`}
      onClick={onClick}
    >
      {content}
    </button>
    // </Link>
     )
    }