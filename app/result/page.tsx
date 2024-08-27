"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import Header from "@/components/header/Header";
import ImageList from "@/components/ImageList/ImageList";
import Pagination from "@/components/Result/Pagination";
import { useSelectedTagsStore } from "@/hooks/zustand/useSelectedTagsStore";
import compareStringAndArray from "@/util/comparestringAndArray";

export default function Result() {

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const { selectedTags } = useSelectedTagsStore();

  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);

  const { data: catData, isLoading, error, refetch } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data', limit, skip, tag],
      queryFn: () => getCats({ limit, skip: skip * limit, tag }),
      enabled: !!tag,
    }
  );

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [limit, skip, tag, refetch]);

  // 태그를 검색했을때 디폴트 값으로 검색
  useEffect(() => {
    setLimit(10);
    setSkip(0);
    router.push(`/result?tag=${tag}&limit=${limit}&skip=${skip}`);
  }, [tag]);

  // limit 을 변경했을때
  useEffect(()=> {
    router.push(`/result?tag=${tag}&limit=${limit}&skip=${skip * limit}`);
  },[limit,skip])

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error instanceof Error) {
    return <p>오류 발생: {error.message}</p>;
  }

  return (
    <>
      <Header />
      {catData?.cats.length ? (
        <>
          <h1 className="px-5 pt-[140px] text-2xl mb-2">
            " {tag} "의
            <select
              value={limit}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setLimit(newValue);
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
        <Pagination currentPage={skip} setCurrentPage={setSkip} />
      </div>
    </>
  );
}
