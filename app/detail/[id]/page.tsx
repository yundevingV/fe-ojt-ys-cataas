"use client";

import { getCatDetail } from "@/api/cats/getCatDetail";
import { CatDTO } from "@/api/cats/getCats";
import { useQuery } from "@tanstack/react-query";
import calculateDateDifference from "@/util/calculateDateDifference";
import calculateBytesToSize from "@/util/calculateBytesToSize";
import Header from "@/components/header/Header";
import ImageInfo from "@/components/result/ImageInfo";
import ButtonTags from "@/components/tag/ButtonTags";
import convertUTCToKST from "@/util/convertUTCtoKST";
import { CiCalendar } from "react-icons/ci";
import { IoTimeSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FaFloppyDisk } from "react-icons/fa6";

interface ResultDetailProps {
  params: {
    id: string; // 동적 경로에서 받아올 id
  };
}

export default function ResultDetail({ params }: ResultDetailProps) {
  const { data: catData } = useQuery<CatDTO, Error>(
    {
      queryKey: ['cat-data', params.id], // 쿼리 키에 id 추가
      queryFn: () => getCatDetail({ _id: params.id }), // getCatDetail 함수에 id를 전달
    }
  );

  // 날짜 변환
  const createdAt = catData?.createdAt && new Date(catData?.createdAt);
  const editedAt = catData?.editedAt && new Date(catData?.editedAt);

  return (
    <div>
      <Header />

      <div className="pt-[180px]">
        <div>
          <img
            src={`https://cataas.com/cat/${catData?._id}`}
            alt="고양이 이미지"
            className="p-4 aspect-auto rounded-3xl mx-auto" // 이미지 스타일
          />
        </div>

        <div className="py-10 px-3 space-y-3 sm:px-20 w-full">
      
          <ImageInfo icon={CiCalendar} text={`${calculateDateDifference(createdAt) + ' 일전 등록함'}` } />
          <ImageInfo icon={IoTimeSharp} text={`등록 ${convertUTCToKST(createdAt)}`} />
          <ImageInfo icon={IoTimeOutline} text={`수정 ${convertUTCToKST(editedAt)}`} />
          <ImageInfo icon={FaFloppyDisk} text={`크기 ${calculateBytesToSize(catData?.size)}`} />
    
          <div className="flex flex-wrap ">
            {catData?.tags.map((tag, index) => (
              <ButtonTags key={index} content={tag} hover="" active="" isDetail={true} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
