import { CatDTO } from "@/api/cats/getCats";

export interface SearchBoxProps {
  image : string;
  tags : CatDTO;
}

export default function SearchBox({image,tags} : SearchBoxProps) {
  return(
    <div>
      이미지
      {tags.tags}
      
    </div>
  )
}
