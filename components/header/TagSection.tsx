import { GetTagsDTO } from '@/api/tags/getTags';
import { useSelectedTagsStore } from '@/hooks/zustand/useSelectedTagsStore';
import { IconType } from 'react-icons';

interface TagSectionProps {
  title: string;
  refreshTag?: (tagsData: GetTagsDTO | undefined) => void;
  tagsData?: GetTagsDTO;
  actionLabel?: string;
  actionIcon?: IconType; // IconType으로 수정
}

export default function TagSection({ title, refreshTag, tagsData, actionLabel, actionIcon: Icon }: TagSectionProps) {
  
  const { clearTags } = useSelectedTagsStore();

  return (
    <div className="flex items-center mb-2 space-x-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {Icon && (
        <div className="cursor-pointer" onClick={() => refreshTag?.(tagsData)}>
          <Icon className="mr-2" size={18} /> {/* 아이콘을 JSX 형태로 렌더링 */}
        </div>
      )}
      {actionLabel && (
        <p className="text-sm cursor-pointer" onClick={clearTags}>
          {actionLabel}
        </p>
      )}
    </div>
  );
};