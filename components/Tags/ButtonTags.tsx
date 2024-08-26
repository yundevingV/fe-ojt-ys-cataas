import { useSelectedTagsStore } from "@/hooks/zustand/useSelectedTagsStore";
import { useRouter } from "next/navigation";

interface ButtonTagsProps {
  content: string;
  textColor?: string;
  hover: string;
  active: string;
  isImageClickedStyle?: string; // 이미지에서 클릭 스타일
  onClick?: (tag: string) => void; // 클릭 핸들러
  isImage?: boolean;
  isDetail?: boolean;
}

export default function ButtonTags({
  content,
  textColor,
  hover,
  active,
  isImageClickedStyle,
  onClick,
  isImage,
  isDetail
}: ButtonTagsProps) {

  const { selectedTags, addTag, removeTag, clearTags } = useSelectedTagsStore();
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

  // 태그 단일 검색
  const searchTag = (tag: string) => {
    clearTags();
    addTag(tag);
    router.push(`/result?tag=${tag}&limit=${10}&skip=${0}`);
  }
  // isClickedTag 태그 클릭
  // isImageClickedStyle 이미지에서 태그 클릭
  const className =
    isClickedTag && isImageClickedStyle
      ? isImageClickedStyle
      : isClickedTag
        ? 'h-10 bg-amber-400 rounded-3xl px-4 py-0 w-auto text-[#000] '
        // 아무것도 없는 태그들 css
        : `border-[${isImageClickedStyle ? '#fff' : '#2f2f2f' }]
           border-2 px-4 py-1 rounded-3xl`;

  return (
    <button
      className={`w-auto flex-row h-10 py-0 cursor-pointer items-center 
      rounded-3xl ${textColor} ${!isClickedTag && (hover ? hover : '')} ${!isClickedTag && (active ? active : '')}
      ${isDetail && 'bg-amber-400 mr-2 mb-2'} opacity-60 mb-2 mr-2`}
      onClick={isClickedTag && isImage
        ? undefined
        : isImage
          ? () => searchTag?.(content)
          : () => toggleTag?.(content)} // 클릭 핸들러 설정
      disabled={isDetail}
    >
      <div className={`flex items-center ${className} `}>
        {content}
        {isClickedTag && !(isDetail === true) && (
          <p
            className="ml-2 cursor-pointer text-red-500"
            onClick={() => toggleTag?.(content)}
          >
            x
          </p>
        )}
      </div>
    </button>
  );
}
