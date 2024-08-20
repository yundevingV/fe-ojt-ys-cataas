import { CatDTO } from "@/api/cats/getCats";
import Tag from "@/components/Tag"
import Link from "next/link";

export interface SearchImageProps {
  cats: CatDTO;
}

export default function SearchImage({ cats }: SearchImageProps) {

  return (
    <div className="">
        <Link href={`/result/${cats._id}`}>
          <img
            src={`https://cataas.com/cat/${cats._id}`}
            alt="고양이 이미지"
            className="aspect-square rounded-lg"
          />
        </Link>
      {/* <div className="flex flex-wrap space-x-2">
      {cats.tags.map((tag, index) => (
        <Tag key={index} content={tag} size="search" />
      ))}
    </div> */}
    </div>
  );
}