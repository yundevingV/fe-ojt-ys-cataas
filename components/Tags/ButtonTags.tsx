import Link from "next/link";

interface ButtonTagsProps {
  content: string;
}

export default function ButtonTags({ content }: ButtonTagsProps) {
  return (
    <Link href={`result/?q=${content}`}>
      <button
        className={`w-auto h-10 px-4 py-0 cursor-pointer font-semibold items-center
      rounded-3xl
      hover:bg-slate-200 flex-row  
      opacity-60
      ` }>
        {content}
      </button>
    </Link>
  )
}