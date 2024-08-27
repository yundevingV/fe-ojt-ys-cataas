import { IconType } from "react-icons";

interface ImageInfoProps {
  icon: IconType; // IconType으로 수정
  text : string | number
}

export default function ImageInfo({ icon: Icon, text }: ImageInfoProps) {
  return (
    <div className="flex text-lg">
      <Icon className="mr-2" size={24} /> {/* 아이콘을 JSX 형태로 렌더링 */}
      <p>{text}</p>
    </div>
  );
}
