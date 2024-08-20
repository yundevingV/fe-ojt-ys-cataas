import { client } from "@/api/client"

export interface CountDTO {
  count : number
}

export const getCount = async () : Promise<CountDTO> => {
  const url = `/api/count`;
  try {
    const { data } = await client.get<CountDTO>(url);
    return data; // CatDTO 배열을 포함하는 객체 반환
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('실패');
  }
};
