import React, { useEffect, useState } from "react";
import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  randomTags: string[];
  setSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags?: string[];
}

export default function ButtonTagsBox({ randomTags, setSelectedTags, selectedTags }: ButtonTagsBoxProps) {

  // 태그 클릭 핸들러
  const toggleTag = (tag: string) => {
    setSelectedTags?.((prev) => {
      if (prev.includes(tag)) {
        // 이미 존재하면 삭제
        return prev.filter((item) => item !== tag);
      } else {
        // 존재하지 않으면 추가
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="flex flex-wrap w-full">
      {randomTags.map((tag, index) => (
        <ButtonTags
          key={index}
          content={tag}
          hover="hover:bg-slate-200"
          active="active:bg-slate-300"
          onClick={() => toggleTag(tag)} // 클릭 시 핸들러 호출
          // deleteTag={() => deleteTag(tag)}
          selectedTags={selectedTags}
        />
      ))}
    </div>
  );
}
