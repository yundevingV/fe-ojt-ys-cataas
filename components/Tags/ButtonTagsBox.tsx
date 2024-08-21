import React, { useState } from "react";
import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  randomTags: string[];
}

export default function ButtonTagsBox({ randomTags }: ButtonTagsBoxProps) {
  // 태그 클릭 상태를 관리하는 state 배열
  const [clickedTags, setClickedTags] = useState(Array(randomTags.length).fill(false));

  // 태그 클릭 핸들러
  const handleTagClick = (index: number) => {
    const newClickedTags = [...clickedTags];
    newClickedTags[index] = !newClickedTags[index]; // 클릭 상태 토글
    setClickedTags(newClickedTags);
  };

  // 태그를 8개씩 묶어서 배열로 생성
  const rows = [];
  for (let i = 0; i < randomTags.length; i += 8) {
    rows.push(randomTags.slice(i, i + 8));
  }

  return (
    <div className="flex flex-col items-center w-2/3 p-10 mx-auto space-y-5">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-5">
          {row.map((tag, index) => (
            <ButtonTags
              key={index}
              content={tag}
              hover="hover:bg-slate-200"
              active="active:bg-slate-300"
              onClick={() => handleTagClick(rowIndex * 8 + index)} // 클릭 시 핸들러 호출
              isActive={clickedTags[rowIndex * 8 + index]} // 클릭 상태 전달
            />
          ))}
        </div>
      ))}
    </div>
  );
}
