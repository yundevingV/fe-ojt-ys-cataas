interface ImageInfoProps {
  leftText : string 
  rightText? : string | number;
}

export default function ImageInfo({leftText, rightText} : ImageInfoProps){
  return(
    <div className="flex justify-between">
    <p className="">{leftText}</p>
    <p>{rightText}</p>
  </div>
  )
}