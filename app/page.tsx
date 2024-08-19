"use client";

import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Tag from "@/components/tag";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  function getRandomItems(arr: string[], count: number): string[] {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞음
    return shuffled.slice(0, count); // 처음 8개의 요소를 반환
  }

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
    <div className="grid grid-cols-4 gap-4"> {/* Tailwind CSS 그리드 클래스 사용 */}
      {randomTags?.map((item, index) => (
        <Tag key={index} content={item} /> 
      ))}
    </div>
    );
}
