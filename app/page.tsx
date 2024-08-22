"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Header from "@/components/header/Header";
import SearchImage from "@/components/Result/SearchImage";
import getRandomNumbers from "@/util/getRandomNumber";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {

  const { data: catData, isLoading: isCatLoading, error: catError } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['first-cat-data'], // 쿼리 키
      queryFn: () => getCats({ limit: 10, skip: getRandomNumbers(0, 150), tag: '' }), // getCats 함수에 태그를 전달합니다.
    }
  );

  //검색 모달창
  const [openSearchModal, setSearchModal] = useState<boolean>(false);

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
      <div className="grid grid-cols-2 gap-4 pt-36 2xl:grid-cols-2 1024:grid-cols-3 md:grid-cols-4
      p-2">

        {catData?.cats.map(cat => (
          <SearchImage key={cat._id} cats={cat} />
        ))}
      </div>

    </div>
  );
}
