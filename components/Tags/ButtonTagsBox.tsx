import React, { useEffect, useState } from "react";
import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  randomTags: string[];
  setSelectedTags?: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags? : string[];
}

export default function ButtonTagsBox({ randomTags,setSelectedTags,selectedTags }: ButtonTagsBoxProps) {
  // 태그 클릭 상태를 관리하는 state 배열
  const [clickedTags, setClickedTags] = useState(Array(randomTags.length).fill(false));

  useEffect(()=>{
    setClickedTags(Array(randomTags.length).fill(false));
  },[randomTags])

// 태그 클릭 핸들러
const handleTagClick = (tag: string) => {
  // const newClickedTags = [...clickedTags];
  // newClickedTags[index] = !newClickedTags[index]; // 클릭 상태 토글

  // setClickedTags(newClickedTags);

  setSelectedTags?.((prev) => {
    // 이미 존재하면 추가하지 않음
    if (!prev.includes(tag)) {
      return [...prev, tag]; // 존재하지 않으면 추가
    }
    return prev; // 이미 존재하면 그대로 반환
  });

};

  // 태그 삭제 핸들러
  const deleteTag = (tag: string) => {
    
    setSelectedTags?.((prev) => {
      // 이미 존재하면 삭제
      return prev.filter((item) => item !== tag);
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
          onClick={() => handleTagClick(tag)} // 클릭 시 핸들러 호출
          deleteTag={() => deleteTag(tag)}
          selectedTags={selectedTags}
        />
      ))}
    </div>
  );
}
