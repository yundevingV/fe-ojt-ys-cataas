import { GetCatsDTO } from "@/api/cats/getCats";
import SearchImage from "../result/SearchImage";
import { useEffect, useState } from "react";
import Masonry from 'react-masonry-css';

interface ImageListProps {
  catData: GetCatsDTO | undefined;
  start: number;
  end: number;
}
// sm:w-[calc(50%-16px)] lg:w-[calc(33.3%-21.3px)]
export default function ImageList({ catData, start, end }: ImageListProps) {
  const breakpointColumnsObj = {
    default: 3, // 기본적으로 3열
    1100: 3,    // 1100px 이상일 때 3열
    700: 2,     // 700px 이상일 때 2열
    500: 1      // 500px 이상일 때 1열
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex"
      columnClassName="" // Tailwind CSS로 패딩 추가
    >
      {catData?.cats.slice(start, end).map(cat => (
        <div key={cat._id} className="flex-shrink-0 w-full h-auto py-5 px-5">
          <SearchImage cats={cat} />
        </div>
      ))}
    </Masonry>
  );
}
