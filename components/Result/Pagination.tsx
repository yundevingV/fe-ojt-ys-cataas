import useWindowSize from '@/hooks/useWindowSize';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
// 모바일일 페이지되는 갯수를 해서 / 10을 변수로 바꾸자 !
export default function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  const [startPage, setStartPage] = useState<number>(0);
  const [buttonPerPage,setButtonPerPage] = useState<number>(10);

  const router = useRouter();
  const searchParams = useSearchParams();

  const windowSize = useWindowSize();

  useEffect(()=>{
    if(windowSize.width > 768){
      setButtonPerPage(10)
    }
    else if (windowSize.width <= 768){
      setButtonPerPage(5)
    }
  },[windowSize.width])

  const limit = searchParams.get("limit");

  useEffect(() => {
    setStartPage(Math.floor(currentPage / buttonPerPage)); // 나눗셈 버림
    router.push(`/result?tag=${searchParams.get("tag")}&limit=${limit}&skip=${Number(limit)*currentPage}`);

  }, [currentPage,buttonPerPage]);

  const handleCurrentPage = (option: string | number) => {
    if (typeof option === 'number') {
      window.scrollTo(0, 0);
      setCurrentPage(option);
    } else if (option === 'next') {
      window.scrollTo(0, 0);
      setCurrentPage(currentPage + 1);
    } else if (option === 'prev') {
      window.scrollTo(0, 0);
      setCurrentPage(currentPage - 1);
    } else if (option === 'prevPerPage') {
      window.scrollTo(0, 0);
      setCurrentPage(currentPage - 10);
    } else if (option === 'nextPerPage') {
      window.scrollTo(0, 0);
      setCurrentPage(currentPage + 10);
    }
  };

  const buttonPaddingStyle = `px-2 py-1`;
  return (
    <div className="flex items-center justify-center mt-4 ">
      <button
        onClick={() => handleCurrentPage('prevPerPage')}
        disabled={currentPage < 10}
        className={`${buttonPaddingStyle} mx-1 rounded text-[#000] hover:bg-slate-200 active:bg-slate-300}`}
      >
        <FaAnglesLeft />
      </button>
      <button
        onClick={() => handleCurrentPage('prev')}
        disabled={currentPage === 0}
        className={`${buttonPaddingStyle} mx-1 rounded text-[#000] hover:bg-slate-200 active:bg-slate-300}`}
      >
        <FaAngleLeft />
      </button>

      {Array.from({ length: buttonPerPage }, (_, index) => (
        <button
          key={(startPage * buttonPerPage) + index} // 시작 페이지를 기준으로 키 설정
          onClick={() => handleCurrentPage((startPage * buttonPerPage) + index)} // 클릭 시 현재 페이지 설정
          className={`${buttonPaddingStyle} items-center mx-1 rounded 
          ${currentPage === (startPage * buttonPerPage) + index && 'bg-blue-600 text-white'} 
          hover:bg-slate-200 active:bg-slate-300
          `}
        >
          {(startPage * buttonPerPage) + index + 1}
        </button>
      ))}

      <button
        onClick={() => handleCurrentPage('next')}
        className={`${buttonPaddingStyle} mx-1 rounded text-[#000] hover:bg-slate-200 active:bg-slate-300`}
      >
        <FaAngleRight />
      </button>
      <button
        onClick={() => handleCurrentPage('nextPerPage')}
        className={`${buttonPaddingStyle} mx-1 rounded text-[#000] hover:bg-slate-200 active:bg-slate-300}`}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};
