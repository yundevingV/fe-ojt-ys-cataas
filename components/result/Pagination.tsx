import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  const [startPage, setStartPage] = useState<number>(0);
  const [buttonPerPage, setButtonPerPage] = useState<number>(10);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined) {
      if (width > 768) {
        setButtonPerPage(10)
      }
      else if (width <= 768) {
        setButtonPerPage(5)
      }
    }
  }, [width])

  useEffect(() => {
    setStartPage(Math.floor(currentPage / buttonPerPage)); // 나눗셈 버림
  }, [currentPage, buttonPerPage]);

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
      setCurrentPage(currentPage - buttonPerPage);
    } else if (option === 'nextPerPage') {
      window.scrollTo(0, 0);
      setCurrentPage(currentPage + buttonPerPage);
    }
  };
  const buttonPaddingStyle = `px-2 py-1`;
  return (
    <div className="flex items-center justify-center mt-4 pb-5">
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
