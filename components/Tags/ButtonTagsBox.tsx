import React from "react";
import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  tag: string[];
}

export default function ButtonTagsBox({ tag }: ButtonTagsBoxProps) {

  return (
    <div className="flex flex-wrap w-full ">
      {tag.map((tag, index) => (
        <ButtonTags
          key={index}
          content={tag}
          hover="hover:bg-slate-200 "
          active="active:bg-slate-300"
        />
      ))}
    </div>
  );
}
