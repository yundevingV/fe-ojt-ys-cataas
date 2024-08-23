import { useSelectedTagsStore } from "@/hooks/zustand/useSelectedTagsStore";
import { useRouter } from "next/navigation";

interface ButtonTagsProps {
  content: string;
  textColor?: string;
  hover: string;
  active: string;
  isClickedStyle?: string; // 이미지에서 클릭 스타일
  onClick?: (tag: string) => void; // 클릭 핸들러
  isImage?: boolean;
}

export default function ButtonTags({
  content,
  textColor,
  hover,
  active,
  isClickedStyle,
  onClick,
  isImage
}: ButtonTagsProps) {

  const { selectedTags, addTag, removeTag } = useSelectedTagsStore();

  const router = useRouter();

  // tag가 선택되었는지 판별
  const isClickedTag = selectedTags?.includes(content);

  // 태그 클릭 핸들러
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // 이미 존재하면 삭제
      removeTag(tag);
    } else {
      // 존재하지 않으면 추가
      addTag(tag);
    }
  };

  //태그 단일 검색
  const searchTag = (tag : string) => {
    addTag(tag);
    router.push(`/result?tag=${tag}`);

  }

  const className =
    isClickedTag && isClickedStyle
      ? isClickedStyle
      : isClickedTag
        ? 'h-10 bg-slate-200 border-2 border-sky-400 rounded-3xl px-4 py-0 w-auto'
        : '';
  return (
    <button
      className={`w-auto flex-row h-10 px-4 py-0 cursor-pointer font-semibold items-center border-2 border-transparent	
      rounded-3xl ${textColor} ${!isClickedTag && (hover ? hover : '')} ${!isClickedTag && (active ? active : '')}
 
      opacity-60 `}
      onClick={isClickedTag && isImage
        ? undefined 
        : isImage 
        ? () => searchTag?.(content)
        : () => toggleTag?.(content)} // 클릭 핸들러 설정
    >
      <div className={`flex items-center
${className}
      `}>
        {content}
        {isClickedTag && (
          <p
            className="ml-2 cursor-pointer text-red-600"
            onClick={() => toggleTag?.(content)}
          >
            x
          </p>
        )}
      </div>
    </button>
  );
}
