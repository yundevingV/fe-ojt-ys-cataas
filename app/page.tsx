"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import ImageList from "@/components/ImageList/ImageList";
import getRandomNumbers from "@/util/getRandomNumber";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: catData, isLoading, } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['first-cat-data'], // 쿼리 키
      queryFn: () => getCats({ limit: 10, skip: getRandomNumbers(0, 150), tag: '' }), // getCats 함수에 태그를 전달합니다.
      staleTime: 1000 * 60 * 5,
    }
  );

  return (
    <div className="">
      {/* 검색 헤더 */}
      <Header />

      {/* 랜덤 검색 결과 */}
      <div className="flex px-8 pt-[140px]">
        <ImageList
          catData={catData}
          start={0}
          end={10}
        />

      </div>
    </div>
  );
}
