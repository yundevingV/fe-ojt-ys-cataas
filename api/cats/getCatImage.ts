import { client } from "@/api/client";

// 요청 DTO 인터페이스
export interface RequestDTO {
  _id: string;
}

// 고양이 이미지를 가져오는 함수
export const getCatImage = async ({ _id }: RequestDTO): Promise<string> => {
  const url = `/cat/${_id}`;

  try {
    const response = await client.get(url, {

      responseType: 'blob', // 응답 타입을 blob으로 설정
    });
    console.log(response)
    
    const imageUrl = URL.createObjectURL(response.data)
    return imageUrl
    
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('이미지를 가져오는 데 실패했습니다.');
  }
};
