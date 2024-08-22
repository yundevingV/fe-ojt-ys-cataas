"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import Pagination from "@/components/Result/Pagination";
import SearchImage from "@/components/Result/SearchImage";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"; // 쿼리 파라미터를 가져오기 위해 추가
import { useState } from "react";

export default function Result() {
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag"); // 쿼리 파라미터에서 tag 가져오기

  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);

  const { data: catData, isLoading, error } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data', limit, skip, tag], // 쿼리 키
      queryFn: () => getCats({ limit: limit, skip: skip * limit, tag: tag }), // getCats 함수에 태그를 전달합니다.
      enabled: !!tag, // tag가 있을 때만 쿼리 실행
    }
  );

  // 페이징 갯수
  const [inputValue, setInputValue] = useState<string>('');

  const handleLimitChange = () => {
    const newLimit = Number(inputValue);
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setInputValue('');
    } else {
      alert('유효한 숫자를 입력하세요.');
    }
  };

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  if (error instanceof Error) {
    return <p>오류 발생: {error.message}</p>;
  }
  
  return (
    <>
      <Header />
      {catData?.cats.length ?
        <>
          <h2 className="pt-[140px]">{tag} 의 검색 결과: </h2>
          <p>보여지는 개수: {limit}</p>
          <input
            type="number"
            value={inputValue ? inputValue : limit}
            onChange={(e) => setInputValue(e.target.value)}
            min={1} // 최소값 설정
            className="border rounded p-1"
          />
          <button onClick={handleLimitChange} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            확인
          </button>
          <div
            className="grid grid-cols-2 gap-4 lg:grid-cols-3 p-2 ">
            {catData?.cats.map(cat => (
              <SearchImage cats={cat} />
            ))}
          </div>


        </>
        :
        <div className="pt-[140px]">
          고양이 사진이없습니다.
        </div>
      }
      {/* skip 이랑 currentPage 는 같음 ! */}
      <Pagination currentPage={skip} setCurrentPage={setSkip} />
    </>
  );
}
