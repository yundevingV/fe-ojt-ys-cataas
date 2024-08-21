import { CatDTO } from "@/api/cats/getCats";
import ButtonTags from "@/components/Tags/ButtonTags"
import Link from "next/link";
import { useState } from "react";

export interface SearchImageProps {
  cats: CatDTO;
}

export default function SearchImage({ cats }: SearchImageProps) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/result/${cats._id}`}>
        <img
          src={`https://cataas.com/cat/${cats._id}`}
          alt="고양이 이미지"
          className="aspect-square rounded-lg"
        />
      </Link>

      {isHovered &&
        <div 
          className="absolute bottom-0 left-0 right-0 p-2 shadow-lg "
          style={{ background: 'linear-gradient(to top, rgba(20, 20, 20, 0.8) 4%, rgba(1, 1, 1, 0.5) 24%, rgba(1, 1, 1, 0.4) 100%)' }}

          >
        {cats.tags.map((tag, index) => (
        <ButtonTags 
          key={index}
          content={tag}
          textColor="text-[#fff]"
          hover="hover:bg-slate-800"
          active="active:bg-slate-900" />
      ))}
        </div>
      }
    </div>
  );
}