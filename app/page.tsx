"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Header from "@/components/header/Header";
import SearchImage from "@/components/Result/SearchImage";
import ButtonTagsBox from "@/components/Tags/ButtonTagsBox";
import getRandomItems from "@/util/getRandomItems";
import getRandomNumbers from "@/util/getRandomNumber";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const INITIAL_ITEMS = 8;
const ITEMS_PER_LOAD = 32;

export default function Home() {

  const { data: tagsData, isLoading: isTagLoading, error: tagError } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'], // 쿼리 키
    queryFn: getTags, // getTags 함수 참조
  });

  // tag 랜덤으로 섞기
  const [randomTags, setRamdomTage] = useState<string[]>();

  useEffect(() => {
    const randomTags = tagsData ? getRandomItems(tagsData, tagsData.length) : []; // 랜덤으로 8개 선택
    setRamdomTage(randomTags)
  }, [tagsData])

  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);

  const handleLoadMore = () => {
    setVisibleItems((prevVisible) => prevVisible + ITEMS_PER_LOAD);
  };
  const handleLoadLess = () => {
    setVisibleItems((prevVisible) => prevVisible - ITEMS_PER_LOAD);
  };
  const { data: catData, isLoading: isCatLoading, error: catError } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['first-cat-data'], // 쿼리 키
      queryFn: () => getCats({ limit: 10, skip: getRandomNumbers(0, 150), tag: '' }), // getCats 함수에 태그를 전달합니다.
    }
  );

  if (isTagLoading && isCatLoading) {
    return <p>로딩 중</p>;
  }

  // 각각의 에러를 개별적으로 확인
  if (tagError) {
    return <p>태그 데이터 오류 발생: {tagError.message}</p>;
  }

  if (catError) {
    return <p>고양이 데이터 오류 발생: {catError.message}</p>;
  }

  const currentItems = randomTags?.slice(0, visibleItems) || [];

  return (
    <div className="">
      {/* 검색 헤더 */}
      <Header />

      {/* 버튼 태그 */}
      <div className="flex flex-col items-center w-2/3 p-10 mx-auto space-y-5">
        <ButtonTagsBox randomTags={currentItems} />
        {visibleItems < (tagsData?.length || 0) && (
          <div>
            {visibleItems > 8 && 
            <button
              onClick={handleLoadLess}
              className="text-[#b2b2b2] rounded-lg px-4 py-2
         hover:bg-slate-200 
         active:bg-slate-300 
         ">
              접기
            </button>
            }
            <button
              onClick={handleLoadMore}
              className="text-[#b2b2b2] rounded-lg px-4 py-2
          hover:bg-slate-200 
          active:bg-slate-300 
          ">
              더 보기
            </button>
          </div>
        )}
      </div>
      {/* 랜덤 검색 결과 */}
      <div className="grid grid-cols-2 gap-4 2xl:grid-cols-2 1024:grid-cols-3 md:grid-cols-4
      p-2">

        {catData?.cats.map(cat => (
          <SearchImage key={cat._id} cats={cat} />
        ))}
      </div>
    </div>
  );
}
