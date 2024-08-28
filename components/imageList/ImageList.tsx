import { GetCatsDTO } from "@/api/cats/getCats";
import SearchImage from "../result/SearchImage";
import { useEffect, useState } from "react";

interface ImageListProps {
  catData: GetCatsDTO | undefined;
  start: number;
  end: number;
}

export default function ImageList({ catData, start, end }: ImageListProps) {
  const [shortLimit, setShortLimit] = useState<number>(0);

  useEffect(() => {
    if (catData && catData.cats.length < end) {
      setShortLimit(catData.cats.length);
    }
  }, [catData]);

  const displayCount = catData && catData?.cats.length < end ? shortLimit : end;

  return (
    <div className="flex flex-col sm:flex-row py-10 gap-5">
      <div className="flex flex-col space-y-10">
        {catData?.cats.slice(start, displayCount / 2).map(cat => (
          <div key={cat._id}>
            <SearchImage cats={cat} />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-10">
        {catData?.cats.slice(displayCount / 2, displayCount).map(cat => (
          <div key={cat._id}>
            <SearchImage cats={cat} />
          </div>
        ))}
      </div>
    </div>
  );
}
