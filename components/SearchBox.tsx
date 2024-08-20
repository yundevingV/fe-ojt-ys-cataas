import { CatDTO } from "@/api/cats/getCats";
import Tag from "./tag";

export interface SearchBoxProps {
  tags: CatDTO;
}

export default function SearchBox({ tags }: SearchBoxProps) {

  return (
    <div className="flex-col space-y-1">
      <img src={`https://cataas.com/cat/${tags._id}`} alt='x' />
      {tags.tags.map((i) =>(
        <Tag content={i} size='small' />
      ))}
    </div>
  );
}