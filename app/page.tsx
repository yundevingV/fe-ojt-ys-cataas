"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import Header from "@/components/header/Header";
import SearchBox from "@/components/SearchBox";
import Tag from "@/components/Tag";
import ButtonTags from "@/components/Tags/ButtonTags";
import ButtonTagsBox from "@/components/Tags/ButtonTagsBox";
import getRandomItems from "@/util/getRandomItems";
import getRandomNumbers from "@/util/getRandomNumber";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: tagsData, isLoading: isTagLoading, error: tagError } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'], // 쿼리 키
    queryFn: getTags, // getTags 함수 참조
  });

  const { data: catData, isLoading: isCatLoading, error: catError } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data'], // 쿼리 키
      queryFn: () => getCats({ page: 10, skip: getRandomNumbers(0,150), tag: '' }), // getCats 함수에 태그를 전달합니다.
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

  const randomTags = tagsData ? getRandomItems(tagsData, 8) : []; // 랜덤으로 8개 선택

  return (
    <div className="">
      {/* 검색 헤더 */}
      <Header />

      {/* 버튼 태그 */}
      <ButtonTagsBox randomTags={randomTags} />

    </div>
  );
}
