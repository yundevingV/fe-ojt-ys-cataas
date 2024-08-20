import Link from "next/link";

interface ButtonTagsProps {
  content: string;
}

export default function ButtonTags({ content }: ButtonTagsProps) {
  return (
    <Link href={`result/?q=${content}`}>
      <button
        className={`w-auto flex-row h-10 px-4 py-0 cursor-pointer font-semibold items-center
      rounded-3xl
      hover:bg-slate-200 active:bg-slate-400
      opacity-60
      ` }>
        {content}
      </button>
    </Link>
  )
}