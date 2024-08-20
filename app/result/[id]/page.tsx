"use client";

import { getCatDetail } from "@/api/cats/getCatDetail";
import { CatDTO } from "@/api/cats/getCats";
import Tag from "@/components/Tag";
import { useQuery } from "@tanstack/react-query";
import calculateDateDifference from "@/util/calculateDateDifference";
import { useEffect, useRef, useState } from "react";
import calculateBytesToSize from "@/util/calculateBytesToSize";

interface ResultDetailProps {
  params: {
    id: string; // 동적 경로에서 받아올 id
  };
}

export default function ResultDetail({ params }: ResultDetailProps) {
  const { data: catData, isLoading, error } = useQuery<CatDTO, Error>(
    {
      queryKey: ['cat-data', params.id], // 쿼리 키에 id 추가
      queryFn: () => getCatDetail({ _id: params.id }), // getCatDetail 함수에 id를 전달
    }
  );

  const imgRef = useRef<HTMLImageElement | null>(null); // 이미지에 대한 ref 생성
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 }); // 이미지 크기를 저장할 상태

  useEffect(() => {
    const measureImageSize = () => {
      if (imgRef.current) {
        const { width, height } = imgRef.current.getBoundingClientRect();
        setImgSize({ width, height });
      }
    };

    // 이미지가 로드된 후 크기를 측정
    if (catData) {
      measureImageSize();
    }

    window.addEventListener('resize', measureImageSize); // 창 크기 변경 시 크기 재측정

    return () => {
      window.removeEventListener('resize', measureImageSize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [catData]); // catData가 변경될 때마다 이미지 크기 측정

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  // 날짜 변환
  const createdAt = catData?.createdAt && new Date(catData?.createdAt);
  const editedAt = catData?.editedAt && new Date(catData?.editedAt);

  console.log(imgSize.width, imgSize.height);

  return (
    <div className="flex flex-col p-4">
      <img
        ref={imgRef} // ref를 img에 연결
        src={`https://cataas.com/cat/${catData?._id}`}
        alt="고양이 이미지"
        className="max-w-lg h-auto rounded-lg mb-4 mx-auto" // 이미지 스타일
        onLoad={() => {
          if (imgRef.current) {
            const { width, height } = imgRef.current.getBoundingClientRect();
            setImgSize({ width, height });
          }
        }}
      />
      <div className="mx-auto p-1" style={{ width: imgSize.width }}>
        <div className="flex justify-between"> {/* 양쪽 정렬을 위해 justify-between 추가 */}
          <div className="flex flex-col">
            <p className=""> 등록일: {createdAt?.toLocaleString().split('오')[0]}</p>
            <p className=""> 최종 수정일: {editedAt?.toLocaleString().split('오')[0]}</p>
          </div>
          <div className="flex flex-col items-end"> {/* 오른쪽 정렬을 위해 items-end 추가 */}
            <p>{calculateDateDifference(createdAt)} 일전</p>
          </div>
        </div>
        <p className="">크기: {calculateBytesToSize(catData?.size)} </p>
      </div>

      <div className="flex">
        {catData?.tags.map((tag, index) => (
          <Tag key={index} content={tag} />
        ))}
      </div>
    </div>
  );
}
