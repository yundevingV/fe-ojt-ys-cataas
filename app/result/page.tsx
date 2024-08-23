"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import Pagination from "@/components/Result/Pagination";
import SearchImage from "@/components/Result/SearchImage";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation"; // 쿼리 파라미터를 가져오기 위해 추가
import { useEffect, useState } from "react";

export default function Result() {
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag"); // 쿼리 파라미터에서 'tag' 가져오기

  const router = useRouter();

  const [limit, setLimit] = useState<number>(Number(searchParams.get("limit")));
  const [skip, setSkip] = useState<number>(Number(searchParams.get("skip")));

  const { data: catData, isLoading, error } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data', limit, skip, tag], // 쿼리 키
      queryFn: () => getCats({ limit: limit, skip: skip * limit, tag: tag }), // getCats 함수에 태그와 페이지 정보를 전달합니다.
      enabled: !!tag, // 'tag'가 있을 때만 쿼리 실행
    }
  );

  useEffect(() => {
    router.push(`/result?tag=${tag}&limit=${limit}&skip=${skip}`); // URL 업데이트
  }, [limit]);

  const handleBack = () => {
    router.back()
  }
  if (isLoading) {
    return <p>로딩 중...</p>; // 로딩 상태 표시
  }

  if (error instanceof Error) {
    return <p>오류 발생: {error.message}</p>; // 오류 메시지 표시
  }

  return (
    <>
      <Header />
      {catData?.cats.length ? (
        <>
          <h2 className="px-5 pt-[140px]">
            {tag}의
            <select
              value={limit}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setLimit(newValue); // limit 업데이트
              }}
              className="border rounded"
            >
              개
              {/* 1부터 30까지의 페이지 갯수 옵션 설정 */}
              {[...Array(30)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select> 개 의 검색 결과:</h2>



          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 p-2">
            {catData?.cats.map(cat => (
              <SearchImage key={cat._id} cats={cat} /> // 각 고양이 사진에 키 추가
            ))}
          </div>
        </>
      ) : (
        <div className="pt-[140px] flex-col justify-center items-center text-center space-y-5">
          <p className="text-2xl">"{tag}"로 검색된 고양이 사진이 없습니다.</p>
          <p 
            className="text-xl"
            onClick={handleBack}
            >
              이전페이지로
        </p>
        </div>

      )}
      {/* 페이징 컴포넌트 */}
      <Pagination currentPage={skip} setCurrentPage={setSkip} />
    </>
  );
}
