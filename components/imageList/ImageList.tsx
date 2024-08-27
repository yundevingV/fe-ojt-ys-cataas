import { GetCatsDTO } from "@/api/cats/getCats";
import SearchImage from "../result/SearchImage";

interface ImageListProps {
  catData: GetCatsDTO | undefined; // cats의 타입을 정의해 주세요.
  start: number;
  end: number;
}

export default function ImageList({ catData, start, end }: ImageListProps) {
  return (
    <div className="flex flex-col sm:flex-row py-10 gap-5">
      <div className="flex flex-col space-y-10">
        {catData?.cats.slice(start, end / 2).map(cat => (
          <div key={cat._id}>
            <SearchImage cats={cat} />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-10">
        {catData?.cats.slice(end / 2, end).map(cat => (
          <div key={cat._id}>
            <SearchImage cats={cat} />
          </div>
        ))}
      </div>
    </div>

  )
}