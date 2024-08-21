import { GetTagsDTO } from "@/api/tags/getTags";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import ButtonTags from "../Tags/ButtonTags";
import getRandomItems from "@/util/getRandomItems";
import ButtonTagsBox from "../Tags/ButtonTagsBox";

interface HeaderProps {
  openSearchModal: boolean;
  setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  tagsData: GetTagsDTO | undefined;
}

export default function Header({ openSearchModal, setSearchModal, tagsData }: HeaderProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 배열 상태
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 여기서 검색 처리 로직을 추가할 수 있습니다.
  };

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSearchModal(false);
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchModal]);

  // 모달 열릴 때 스크롤 막기
  useEffect(() => {
    if (openSearchModal) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
    } else {
      document.body.style.overflow = ''; // 원래 상태로 되돌리기
    }
  }, [openSearchModal]);

  // tag 랜덤으로 섞기
  const [randomTags, setRamdomTag] = useState<string[]>();

  // tag 새로고침
  const refreshTag = (tagsData: GetTagsDTO | undefined) => {
    const refreshTags = tagsData && getRandomItems(tagsData, 10)
    setRamdomTag(refreshTags)
  }

  useEffect(() => {
    const randomTags = tagsData ? getRandomItems(tagsData, 10) : []; // 랜덤으로 10개 선택
    setRamdomTag(randomTags)
  }, [tagsData])

  return (
    <div className={`fixed w-full h-[100px] p-5 pr-10 bg-white shadow-md z-10 flex items-center justify-between`}>
      <p className={`text-[28px] font-bold text-gray-800`}>cataas</p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center relative w-1/3">
        <input
          type="text"
          value={selectedTags}
          // onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
          className="border border-gray-300 rounded-l-lg p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="검색어 입력" // 접근성 추가
          onClick={() => setSearchModal(true)}
        />
        <CiSearch className="absolute left-3 text-gray-500" size={20} />
        <button type="submit" className="hidden">검색</button>

        {openSearchModal && (
          <>
            {/* 배경 어둡게 하는 오버레이 */}
            <div className="fixed inset-0 bg-black opacity-50 z-0"></div>
            <div ref={modalRef} className="absolute top-12 p-2 h-auto bg-slate-100 z-10 w-full">
              {selectedTags &&
                <div className="">
                  <h3 className="text-lg font-semibold">선택된 태그 </h3>
                  <div className="flex">
                      <ButtonTagsBox randomTags={selectedTags} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
                  </div>
                </div>
              }
              <div className="flex justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">추천 태그 </h3>
                  <div
                    className="ml-2 cursor-pointer"
                    onClick={() => refreshTag(tagsData)}
                  >
                    <GrPowerReset />
                  </div>
                </div>
                <button onClick={() => setSearchModal(false)}>x</button>
              </div>
              {/* 태그 버튼을 여기에 추가하세요 */}
              <div className="flex flex-wrap space-x-2">
                {randomTags && <ButtonTagsBox randomTags={randomTags} setSelectedTags={setSelectedTags} />}

                {/* 필요한 만큼 태그 버튼 추가 */}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
