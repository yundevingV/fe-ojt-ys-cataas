import { CatDTO } from "@/api/cats/getCats";
import ButtonTags from "@/components/tag/ButtonTags";
import useLazyLoad from "@/hooks/useLazyLoad";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

export interface SearchImageProps {
  cats: CatDTO;
}

export default function SearchImage({ cats }: SearchImageProps) {
  const { ref, isVisible } = useLazyLoad();
  const [isHovered, setIsHovered] = useState(false);
  const [, setSelectedTags] = useState<string[]>([]);

  // 이미지 로딩 스켈레톤
  const [isLoaded, setIsLoaded] = useState(false);
  // 최종 로딩 실패
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  // 태그 클릭 핸들러
  const toggleTag = (tag: string) => {
    setSelectedTags?.((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer 
      ${!isLoaded && 'sm:min-h-64 bg-slate-300 animate-pulse rounded-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {isVisible && (
        <Link href={`/detail/${cats._id}`} className="">
          <Image
            src={`https://cataas.com/cat/${cats._id}`}
            width={600}
            height={500}
            sizes="600px"
            alt="고양이 이미지"
            className={`rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-[1.03] ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onLoadingComplete={handleLoadingComplete}
            onError={() => setIsImageLoaded(false)} // 이미지 로드 실패 시 처리
          />
          {/* <img
            src={`https://cataas.com/cat/${cats._id}`}
            alt="고양이 이미지"
            className={`rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-[1.03] ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsImageLoaded(false)} // 이미지 로드 실패 시 처리
          /> */}
        </Link>
      )}

      {!isImageLoaded && (
        <div className="w-full h-full flex items-center justify-center ">
          <p className="text-center">이미지를 불러올 수 없습니다.</p>
        </div>
      )}
      {isHovered && (
        <div
          ref={containerRef}
          className="absolute bottom-0 left-0 right-0 p-2 shadow-lg text-ellipsis flex"
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
          {cats.tags.length > 3 && (
            <Link href={`/detail/${cats._id}`}>
              <p className="text-[#fff] h-10 flex justify-center items-center ml-3 cursor-pointer">
                더 보기
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
