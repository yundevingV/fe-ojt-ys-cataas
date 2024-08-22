import { CatDTO } from "@/api/cats/getCats";
import ButtonTags from "@/components/Tags/ButtonTags"
import Link from "next/link";
import { useState } from "react";

export interface SearchImageProps {
  cats: CatDTO;
}

export default function SearchImage({ cats }: SearchImageProps) {

  const [isHovered, setIsHovered] = useState(false);

  const [,setSelectedTags] = useState<string[]>([]);

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
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/detail/${cats._id}`}>
        <img
          src={`https://cataas.com/cat/${cats._id}`}
          alt="고양이 이미지"
          className="aspect-square rounded-lg"
        />
      </Link>

      {isHovered &&
        <div
          className="absolute bottom-0 left-0 right-0 p-2 shadow-lg text-ellipsis"
          style={{ background: 'linear-gradient(to top, rgba(20, 20, 20, 0.8) 4%, rgba(1, 1, 1, 0.5) 24%, rgba(1, 1, 1, 0.4) 100%)' }}

        >
          {cats.tags.map((tag, index) => (
            <ButtonTags
              key={index}
              content={tag}
              textColor="text-[#fff]"
              isClickedStyle='bg-white text-[#2f2f2f] h-10 rounded-3xl px-4 py-0 w-auto'
              onClick={()=>toggleTag(tag)}
              hover="hover:bg-slate-200 hover:text-[#2f2f2f]"
              active="active:bg-red-300 hover:text-[#2f2f2f]" />
          ))}
        </div>
      }
    </div>
  );
}