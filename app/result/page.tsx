"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import { useQuery } from "@tanstack/react-query";

export default function Result() {
  const tag = 'Bengal'; // 사용할 태그를 정의합니다.

  const { data: catData, isLoading, error } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data', tag], // 쿼리 키
      queryFn: () => getCats({page : 10, skip : 0, tag : tag}), // getCats 함수에 태그를 전달합니다.
    }
  );

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  if (error instanceof Error) {
    return <p>오류 발생: {error.message}</p>;
  }

  return (
    <>
      <h2>검색 결과:</h2>
      <ul>
        {catData?.cats.map(cat => (
          <li key={cat._id}>{cat._id}</li>
        ))}
      </ul>
    </>
  );
}
