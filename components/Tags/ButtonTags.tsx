import Link from "next/link";

interface ButtonTagsProps {
  content: string;
  textColor?: string; 
  hover: string;
  active?: string;
}

export default function ButtonTags({ content, textColor, hover, active  }: ButtonTagsProps) {
  return (
    <Link href={`result/?q=${content}`}>
      <button
        className={`w-auto flex-row h-10 px-4 py-0 cursor-pointer font-semibold items-center
      rounded-3xl ${textColor} ${hover} ${active}
      opacity-60
      ` }>
        {content}
      </button>
    </Link>
  )
}