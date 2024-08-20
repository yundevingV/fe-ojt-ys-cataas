import ButtonTags from "./ButtonTags";

interface ButtonTagsBoxProps {
  randomTags : string[];
}

export default function ButtonTagsBox({randomTags} : ButtonTagsBoxProps) {
  return(
    <div className="flex justify-center w-2/3 p-10 mx-auto space-x-5">
        {randomTags.map((i)=>(
          <ButtonTags content={i} />
        ))}
      </div>
  )
}