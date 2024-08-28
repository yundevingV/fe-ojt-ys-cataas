import { CatDTO } from "@/api/cats/getCats";
import ButtonTags from "@/components/tag/ButtonTags";
import useLazyLoad from "@/hooks/useLazyLoad";
import Link from "next/link";
import { useState, useRef } from "react";

export interface SearchImageProps {
  cats: CatDTO;
}

export default function SearchImage({ cats }: SearchImageProps) {

  const { ref, isVisible } = useLazyLoad();

  const [isHovered, setIsHovered] = useState(false);
  const [, setSelectedTags] = useState<string[]>([]);

  // 태그 클릭 핸들러
  const toggleTag = (tag: string) => {
    setSelectedTags?.((prev) => {
      if (prev.includes(tag)) {
        // 이미 존재하면 삭제
        return prev.filter((item) => item !== tag);
      } else {
        // 존재하지 않으면 추가
        return [...prev, tag];
      }
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (

    <div
      ref={ref}
      className={`relative cursor-pointer min-h-40 ${isVisible ? '' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isVisible ? (
        <Link href={`/detail/${cats._id}`}>
          <img
            src={`https://cataas.com/cat/${cats._id}`}
            alt="고양이 이미지"
            className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03]" // 애니메이션 클래스 추가
          />
        </Link>
      ) : null}

      {isHovered && (
        <div
          ref={containerRef}
          className="absolute bottom-0 left-0 right-0 p-2 shadow-lg text-ellipsis flex "
          style={{
            background: 'linear-gradient(to top, rgba(20, 20, 20, 0.8) 4%, rgba(1, 1, 1, 0.5) 24%, rgba(1, 1, 1, 0.4) 100%)',
            maxHeight: '60px',
            overflowY: 'auto',
          }}
        >
          {cats.tags.slice(0, 3).map((tag, index) => (
            <ButtonTags
              key={index}
              content={tag}
              textColor="text-[#fff]"
              isImageClickedStyle='bg-white text-[#2f2f2f] h-10 rounded-3xl px-4 py-0 w-auto'
              onClick={() => toggleTag(tag)}
              isImage={true}
              hover="hover:bg-slate-200 hover:text-[#2f2f2f]"
              active="active:bg-slate-300 hover:text-[#2f2f2f]"
            />
          ))}
          {cats.tags.length > 3 &&
            <Link href={`/detail/${cats._id}`}>
              <p
                className="text-[#fff] h-10 flex justify-center items-center ml-3 cursor-pointer">
                더 보기
              </p>
            </Link>
          }
        </div>
      )}
    </div>
  );
}
