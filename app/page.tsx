"use client";

import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Tag from "@/components/tag";
import getRandomItems from "@/util/getRandomItems";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: tagsData, isLoading, error } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'], // 쿼리 키
    queryFn: getTags, // getTags 함수 참조
  });

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }

  const randomTags = tagsData ? getRandomItems(tagsData, 8) : []; // 랜덤으로 8개 선택

  return (
    <div className="">
      <div className="fixed w-full left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center p-4">
        <h2 className="text-center">태그를 클릭해 고양이를 검색해보세요.</h2>

        {/* 검색 태그 */}
        <div className="w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {randomTags?.map((item, index) => (
            <Tag key={index} content={item} />
          ))}
        </div>
      </div>

      
    </div>

  );
}
