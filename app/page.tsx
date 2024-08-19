"use client";

import { getCats, GetCatsDTO } from "@/api/cats/getCats";
import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import SearchBox from "@/components/SearchBox";
import Tag from "@/components/tag";
import getRandomItems from "@/util/getRandomItems";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: tagsData, isLoading: isTagLoading, error: tagError } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'], // 쿼리 키
    queryFn: getTags, // getTags 함수 참조
  });

  const { data: catData, isLoading: isCatLoading, error: catError } = useQuery<GetCatsDTO, Error>(
    {
      queryKey: ['cat-data'], // 쿼리 키
      queryFn: () => getCats({ page: 10, skip: 0, tag: '' }), // getCats 함수에 태그를 전달합니다.
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
  console.log(catData?.cats)
  return (
    <div className="">
      {/* 검색 헤더 */}
      <div className="fixed w-full left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center p-4">
        <h2 className="text-center">태그를 클릭해 고양이를 검색해보세요.</h2>

        {/* 검색 태그 */}
        <div className="w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {randomTags?.map((item, index) => (
            <Tag key={index} content={item} />
          ))}
        </div>
      </div>
      <div className="pt-[300px] md:pt-[190px] w-2/3 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* gap을 추가하여 아이템 간의 여백을 설정 */}
          {catData?.cats.map(cat => (
            <SearchBox key={cat._id} image="a" tags={cat} />
          ))}
        </div>
      </div>

    </div>
  );
}
