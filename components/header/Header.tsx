"use client";

import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import getRandomItems from "@/util/getRandomItems";
import ButtonTagsBox from "../Tags/ButtonTagsBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSearchModalStore } from "@/hooks/zustand/useSearchModalStore";

export default function Header() {

  const { data: tagsData, isLoading, error } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'], // 쿼리 키
    queryFn: getTags, // getTags 함수 참조
  });

  const searchParams = useSearchParams();

  const { openSearchModal, setSearchModal } = useSearchModalStore();

  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 배열 상태
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조

  const handleSubmit = (selectedTags: string[]) => {
    // 여기서 검색 처리 로직을 추가할 수 있습니다.
    if (selectedTags) {
      // 태그를 ','로 구분하여 URL로 이동
      router.push(`/result/?q=${selectedTags}`);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit; // 엔터 키를 눌렀을 때 이동
    }
  };

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSearchModal(false);
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchModal]);

  // 모달 열릴 때 스크롤 막기
  useEffect(() => {
    if (openSearchModal) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
    } else {
      document.body.style.overflow = ''; // 원래 상태로 되돌리기
    }
  }, [openSearchModal]);

  // tag 랜덤으로 섞기
  const [randomTags, setRamdomTag] = useState<string[]>();

  // tag 새로고침
  const refreshTag = (tagsData: GetTagsDTO | undefined) => {
    const refreshTags = tagsData && getRandomItems(tagsData, 10)
    setRamdomTag(refreshTags)
  }

  // 쿼리 파라미터에서 tag 가져오기
  const tag = searchParams.get("q");

  // tag가 undefined일 경우 빈 배열로 처리
  const prevTagArray = tag ? tag.split(',') : [];

  // 기존 검색어 배열 저장
  useEffect(() => {
    setSelectedTags(prevTagArray);
  }, [tag]);

  useEffect(() => {
    const randomTags = tagsData ? getRandomItems(tagsData, 10) : []; // 랜덤으로 10개 선택
    setRamdomTag(randomTags);
  }, [tagsData])


  return (
    <div className={`fixed w-full h-[100px] p-5 pr-10 bg-white shadow-md z-10 flex items-center justify-between`}>
      <p className={`text-[28px] font-bold text-gray-800`}>cataas</p>

      <div
        // onSubmit={()=>handleSubmit}
        className="flex items-center relative w-1/3">
        <input
          type="text"
          value={selectedTags}
          // onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
          className="border border-gray-300 rounded-l-lg p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="검색어 입력" // 접근성 추가
          onClick={() => setSearchModal(true)}
          onKeyDown={handleKeyPress}
        />

        <CiSearch onClick={() => handleSubmit(selectedTags)} className="absolute left-3 text-gray-500 cursor-pointer" size={20} />

        {openSearchModal && (
          <>
            {/* 배경 어둡게 하는 오버레이 */}
            <div className="fixed inset-0 z-0"></div>
            <div ref={modalRef} className="absolute top-12 p-2 h-auto bg-slate-100 z-10 w-full">
              {selectedTags &&
                <div className="">
                  <h3 className="text-lg font-semibold">선택된 태그 </h3>
                  <div className="flex">
                    <ButtonTagsBox randomTags={selectedTags} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
                  </div>
                </div>
              }
              <div className="flex justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">추천 태그 </h3>
                  <div
                    className="ml-2 cursor-pointer"
                    onClick={() => refreshTag(tagsData)}
                  >
                    <GrPowerReset />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap space-x-2">
                {randomTags && <ButtonTagsBox randomTags={randomTags} setSelectedTags={setSelectedTags} />}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
