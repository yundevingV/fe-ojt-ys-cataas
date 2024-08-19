interface TagProps {
  content : string;
}

export default function Tag({content} : TagProps) {
  return(
    <button 
      className={`w-auto h-auto px-5 py-2 bg-slate-300 rounded-lg
      hover:bg-slate-400 active:bg-slate-500 cursor-pointer
      `}>
      {content}
    </button>
  )
}