import Link from "next/link";

interface ButtonTagsProps {
  content: string;
  textColor?: string;
  hover: string;
  active: string;
  onClick?: () => void; // 클릭 핸들러
  deleteTag?: (tag?: string) => void; // 선택적 삭제 핸들러
  selectedTags?: string[]; // 선택된 태그 배열
}

export default function ButtonTags({
  content,
  textColor,
  hover,
  active,
  onClick,
  deleteTag, 
  selectedTags,
}: ButtonTagsProps) {

  // tag가 선택되었는지 판별
  const isClickedTag = selectedTags?.includes(content);

  return (
    <button
      className={`w-auto flex-row h-10 px-4 py-0 cursor-pointer font-semibold items-center border-2 border-transparent	
      rounded-3xl ${textColor} ${hover} ${active}
      opacity-60 `}
      onClick={isClickedTag ? undefined : onClick} // 클릭 핸들러 설정
    >
      <div className={`flex items-center
        ${isClickedTag ? 'h-10 bg-slate-200 border-2 border-sky-400 rounded-3xl px-4 py-0 w-auto' : ''}
      `}>
        {content}
        {isClickedTag && (
          <p 
            className="ml-2 cursor-pointer text-red-600"
            onClick={onClick} // handleDelete를 직접 사용
          >
            x
          </p>
        )}
      </div>
    </button>
  );
}
