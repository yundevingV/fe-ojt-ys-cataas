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
import { useSelectedTagsStore } from "@/hooks/zustand/useSelectedTagsStore";
import Link from "next/link";

export default function Header() {
  const { data: tagsData, isLoading, error } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'],
    queryFn: getTags,
  });

  const searchParams = useSearchParams();
  const { openSearchModal, setSearchModal } = useSearchModalStore();
  const { selectedTags, addTag, clearTags } = useSelectedTagsStore();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (selectedTags: string[]) => {
    if (selectedTags.length) {
      router.push(`/result?tag=${selectedTags}&limit=${10}&skip=${0}`);
    }
    else {
      alert('검색할 태그를 지정해주세요 ! ')
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSearchModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchModal]);

  useEffect(() => {
    if (openSearchModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openSearchModal]);

  const [randomTags, setRamdomTag] = useState<string[]>();
  const refreshTag = (tagsData: GetTagsDTO | undefined) => {
    const refreshTags = tagsData && getRandomItems(tagsData, 20);
    setRamdomTag(refreshTags);
  };

  const tag = searchParams.get("q");
  const prevTagArray = tag ? tag.split(',') : [];

  useEffect(() => {
    prevTagArray.forEach(tag => {
      addTag(tag);
    });
  }, [tag, addTag]);

  useEffect(() => {
    const randomTags = tagsData ? getRandomItems(tagsData, 20) : [];
    setRamdomTag(randomTags);
  }, [tagsData]);

  const clear = () => {
    clearTags();
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <div className="fixed w-full h-[100px] p-5 pr-10 bg-white shadow-md z-10 flex items-center justify-center">
      <div className="flex-col items-center justify-center w-full max-w-3xl">
        <Link className={`text-[28px] font-bold text-gray-800 text-center`} href='/' onClick={clear}>
          <p>cataas</p>
        </Link>
        <div className="flex items-center relative mx-4">
          <input
            type="text"
            value={selectedTags}
            placeholder="검색어를 입력하세요"
            className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="검색어 입력"
            onClick={() => setSearchModal(true)}
          />

          <CiSearch onClick={() => handleSubmit(selectedTags)} className="absolute left-3 text-gray-500 cursor-pointer" size={20} />

          {openSearchModal && (
            <>
              <div className="fixed inset-0 z-0"></div>
              <div ref={modalRef} className="absolute top-12 p-4 h-auto bg-white z-10 w-full">
                {selectedTags && (
                  <div>
                    <h3 className="text-lg font-semibold">선택된 태그 </h3>
                    {selectedTags.length ?
                      <div className="flex p-2">
                        <ButtonTagsBox tag={selectedTags} />
                      </div>
                      :
                      <div className="flex justify-center p-4">
                        선택된 태그가 없습니다.
                      </div>
                    }

                  </div>
                )}
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
                  {randomTags && <ButtonTagsBox tag={randomTags} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
