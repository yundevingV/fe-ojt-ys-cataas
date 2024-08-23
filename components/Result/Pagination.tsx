import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
// 모바일일 페이지되는 갯수를 해서 / 10을 변수로 바꾸자 !
export default function Pagination({ currentPage, setCurrentPage }: PaginationProps) {
  const [startPage, setStartPage] = useState<number>(0);
  const [buttonPerPage,setButtonPerPage] = useState<number>(10);

  const windowSize = useWindowSize();

  useEffect(()=>{
    if(windowSize.width > 768){
      setButtonPerPage(10)
    }
    else if (windowSize.width <= 768){
      setButtonPerPage(5)
    }
  },[windowSize.width])

  useEffect(() => {
    setStartPage(Math.floor(currentPage / buttonPerPage)); // 나눗셈 버림
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
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handleCurrentPage('prev')}
        disabled={currentPage === 0}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        이전
      </button>

      {Array.from({ length: buttonPerPage }, (_, index) => (
        <button
          key={(startPage * buttonPerPage) + index} // 시작 페이지를 기준으로 키 설정
          onClick={() => handleCurrentPage((startPage * buttonPerPage) + index)} // 클릭 시 현재 페이지 설정
          className={`px-4 py-2 mx-1 rounded ${currentPage === (startPage * buttonPerPage) + index ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
        >
          {(startPage * buttonPerPage) + index + 1}
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
