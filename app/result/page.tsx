"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import ImageList from "@/components/ImageList/ImageList";
import Pagination from "@/components/Result/Pagination";

export default function Result() {

  const searchParams = useSearchParams();

  const tag = searchParams.get("tag");
  const limit = Number(searchParams.get("limit"))
  const skip = Number(searchParams.get("skip"))

  const { data: catData, isLoading } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data', limit, skip, tag],
      queryFn: () => getCats({ limit, skip, tag }),
    }
  );

  const router = useRouter();

  // 페이지
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(skip / limit);
  }, [skip])

  useEffect(() => {
    router.push(`/result?tag=${tag}&limit=${limit}&skip=${limit * currentPage}`);
  }, [currentPage])

  // 태그를 검색했을때 디폴트 값으로 검색
  useEffect(() => {

    router.push(`/result?tag=${tag}&limit=${limit}&skip=${skip}`);
  }, [tag]);

  const handleLimit = (newValue: number) => {
    router.push(`/result?tag=${tag}&limit=${newValue}&skip=${newValue * currentPage}`);
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="pt-[140px] mb-[50%] justify-center items-center text-center space-y-5">
          <p className="text-2xl"> 검색중입니다 ... </p>
        </div>
        ) 
        : catData?.cats.length ? (
          <>
            <h1 className="px-5 pt-[140px] text-2xl mb-2">
              " {tag} "의
              <select
                value={limit}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  handleLimit(newValue);
                }}
                className="border rounded"
              >
                개
                {[...Array(6)].map((_, index) => (
                  <option key={index + 1} value={(index + 1) * 5}>
                    {(index + 1) * 5}
                  </option>
                ))}
              </select> 개의 검색 결과
            </h1>

            <div className="flex px-8">
              <ImageList
                catData={catData}
                start={0}
                end={limit}
              />
            </div>
          </>
        ) : (
        <div className="pt-[140px] mb-[50%] justify-center items-center text-center space-y-5">
          <p className="text-2xl">" {tag} "로 검색된 고양이 사진이 없습니다.</p>
        </div>
      )}
      <div className={`sticky`}>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
}
