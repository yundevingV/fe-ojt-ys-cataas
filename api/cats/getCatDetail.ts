import { client } from "@/api/client";
import { CatDTO } from "./getCats";

// 요청 DTO 인터페이스
export interface RequestDTO {
  _id: string;
}

// 고양이 정보를 가져오는 함수
export const getCatDetail = async ({ _id }: RequestDTO): Promise<CatDTO> => {
  const url = `/cat/${_id}`;

  try {
    const response = await client.get(url, {

    });
    
    return response.data
    
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('이미지를 가져오는 데 실패했습니다.');
  }
};
