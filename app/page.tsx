"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import SearchImage from "@/components/Result/SearchImage";
import getRandomNumbers from "@/util/getRandomNumber";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: catData, isLoading: isCatLoading, error: catError } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['first-cat-data'], // 쿼리 키
      queryFn: () => getCats({ limit: 10, skip: getRandomNumbers(0, 150), tag: '' }), // getCats 함수에 태그를 전달합니다.
      staleTime: 1000 * 60 * 5, 
    }
  );

  if (isCatLoading) {
    return <p>로딩 중</p>;
  }

  if (catError) {
    return <p>고양이 데이터 오류 발생: {catError.message}</p>;
  }
  return (
    <div className="">
      {/* 검색 헤더 */}
      <Header />
      
      {/* 랜덤 검색 결과 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 pt-36 p-2">

        {catData?.cats.map(cat => (
          <SearchImage key={cat._id} cats={cat} />
        ))}
      </div>

    </div>
  );
}
