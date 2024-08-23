import React, { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currentPage, setCurrentPage }: PaginationProps) {

  const [startPage, setStartPage] = useState<number>(0);

  useEffect(() => {
    setStartPage(Math.floor((currentPage) / 10)); // 나눗셈 버림

  }, [currentPage]);

  const handleCurrentPage = (option: string | number) => {
    if (typeof (option) === 'number') {
      window.scrollTo(0,0)
      setCurrentPage(option)
    }
    else if (option === 'next') {
      window.scrollTo(0,0)
      setCurrentPage(currentPage + 1)
    }
    else if (option === 'prev') {
      window.scrollTo(0,0)
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handleCurrentPage('prev')}
        disabled={currentPage === 0}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        이전
      </button>

      {Array.from({ length: 10 }, (_, index) => (
        <button
          key={(startPage * 10) + index} // 시작 페이지를 기준으로 키 설정
          onClick={() => handleCurrentPage((startPage * 10) + index)} // 클릭 시 현재 페이지 설정
          className={`px-4 py-2 mx-1 rounded ${currentPage === (startPage * 10) + index ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
        >
          {(startPage * 10) + index + 1}
        </button>
      ))}

      <button
        onClick={() => handleCurrentPage('next')}
        className={`px-4 py-2 mx-1 rounded bg-blue-500 text-white`}
      >
        다음
      </button>
    </div>
  );
};