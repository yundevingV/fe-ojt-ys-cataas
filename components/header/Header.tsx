"use client";

import { getTags, GetTagsDTO } from "@/api/tags/getTags";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import getRandomItems from "@/util/getRandomItems";
import ButtonTagsBox from "../tag/ButtonTagsBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSelectedTagsStore } from "@/hooks/zustand/useSelectedTagsStore";
import Link from "next/link";
import TagSection from "./TagSection";

interface HeaderProps {
  openSearchModal : boolean;
  setOpenSearchModal : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({openSearchModal, setOpenSearchModal} : HeaderProps) {
  const { data: tagsData } = useQuery<GetTagsDTO>({
    queryKey: ['tags-data'],
    queryFn: getTags,
  });

  const searchParams = useSearchParams();
  const { selectedTags, addTag, clearTags } = useSelectedTagsStore();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (selectedTags: string[]) => {
    if (selectedTags.length) {
      setOpenSearchModal(false);
      router.push(`/result?tag=${selectedTags}&limit=${10}&skip=${0}`);
    }
    else {
      alert('검색할 태그를 지정해주세요 ! ');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event : any) => {
      if (event.key === 'Enter') {
        handleSubmit(selectedTags); // 엔터 키가 눌리면 검색 실행
      }
    };

    const modalElement = modalRef.current;
    modalElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      modalElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenSearchModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenSearchModal]);

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

  return (
    <div className="fixed w-full h-[100px]  bg-white shadow-md z-10 flex items-center justify-center">
      <div className="flex-col items-center justify-center w-full max-w-2xl ">
        <Link className={`text-[28px] font-bold text-gray-800 text-center`} href='/' onClick={clear}>
          <p>cataas</p>
        </Link>
        <div className="flex justify-center items-center relative w-2/3 mx-auto z-10">
          <input
            type="text"
            value={selectedTags}
            onChange={(e) => e.target.value}
            placeholder="검색어를 입력하세요"
            className="border border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="검색어 입력"
            onClick={() => setOpenSearchModal(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(selectedTags);
              }
            }}
          />

          <CiSearch
            onClick={() => handleSubmit(selectedTags)}
            className="absolute left-3 text-gray-500 cursor-pointer" size={20} />

          {openSearchModal && (
            <>
              <div 
                ref={modalRef}
                className="fixed inset-0 z-0 bg-black bg-opacity-20" 
                tabIndex={0}
                />
              <div
                ref={modalRef} 
                className="absolute top-14 p-6 h-auto bg-white z-10 w-full rounded-2xl
                border-2 border-[#aaaaaa]
                ">
                {selectedTags && (
                  <div className="flex-col">

                    <TagSection
                      title='선택된 태그'
                      actionLabel='전체 삭제'
                    />

                    <div className={`flex`}>
                      {selectedTags.length ?
                        <div className="flex flex-wrap space-x-2">
                          <ButtonTagsBox tag={selectedTags} />
                        </div>
                        :
                        <div className="flex justify-center p-4">
                          선택된 태그가 없습니다.
                        </div>
                      }
                    </div>

                  </div>
                )}
                <div className="flex-col ">
                  <TagSection
                    title="추천태그"
                    refreshTag={refreshTag}
                    tagsData={tagsData}
                    actionIcon={GrPowerReset}
                  />
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
