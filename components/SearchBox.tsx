import { CatDTO } from "@/api/cats/getCats";
import Tag from "@/components/Tag"
import Link from "next/link";
export interface SearchBoxProps {
  tags: CatDTO;
}

export default function SearchBox({ tags }: SearchBoxProps) {

  return (
  <div className="flex-col space-y-1">
    <div className="relative w-full h-48 overflow-hidden"> {/* 높이 설정 */}
      <Link href={`/result/${tags._id}`}>
      <img
        src={`https://cataas.com/cat/${tags._id}`}
        alt="고양이 이미지"
        className="absolute top-0 left-0 w-full h-full object-cover" // 높이 일정하게 유지
      />
      </Link>
    </div>
    <div className="flex flex-wrap space-x-2">
      {tags.tags.map((tag, index) => (
        <Tag key={index} content={tag} size="search" />
      ))}
    </div>
  </div>
  );
}