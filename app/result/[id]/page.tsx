"use client";

import { getCatDetail } from "@/api/cats/getCatDetail";
import { CatDTO } from "@/api/cats/getCats";
import Tag from "@/components/Tag";
import { useQuery } from "@tanstack/react-query";
import calculateDateDifference from "@/util/calculateDateDifference";
import { useEffect, useRef, useState } from "react";
import calculateBytesToSize from "@/util/calculateBytesToSize";
import Header from "@/components/header/Header";
import ImageInfo from "@/components/Result/ImageInfo";

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  // 날짜 변환
  const createdAt = catData?.createdAt && new Date(catData?.createdAt);
  const editedAt = catData?.editedAt && new Date(catData?.editedAt);

  return (
    <div>
      <Header />

      <div className="flex p-8 text-xl justify-between">
        {/* 왼쪽부분 */}
        <div>
          <img
            src={`https://cataas.com/cat/${catData?._id}`}
            alt="고양이 이미지"
            className="max-w-lg max-h-screen aspect-auto	rounded-lg mx-auto" // 이미지 스타일
          />
        </div>

        {/* 오른쪽부분 */}
        <div className="flex-col px-6 w-80 space-y-2">
      
          <ImageInfo leftText='' rightText={`${calculateDateDifference(createdAt) + ' 일전'}` } />
          <ImageInfo leftText='등록일' rightText={createdAt?.toLocaleString().split('오')[0]} />
          <ImageInfo leftText='최종 수정일' rightText={editedAt?.toLocaleString().split('오')[0]} />
          <ImageInfo leftText='크기' rightText={`${calculateBytesToSize(catData?.size)}`} />
    
          <div className="flex">
            {catData?.tags.map((tag, index) => (
              <Tag key={index} content={tag} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
