import React from "react";
import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  randomTags: string[];
}

export default function ButtonTagsBox({ randomTags }: ButtonTagsBoxProps) {
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
            <ButtonTags key={index} content={tag} hover="hover:bg-slate-200" active="active:bg-slate-300"/>
          ))}
        </div>
      ))}
    </div>
  );
}
