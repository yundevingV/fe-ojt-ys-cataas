"use client";

import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Tag from "@/components/tag";
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

  return (
    <div>
      {tagsData?.map((item, index) => (
        <Tag key={index} content={item} /> 
      ))}
    </div>
    );
}
