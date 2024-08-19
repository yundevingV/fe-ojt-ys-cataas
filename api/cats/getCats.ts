import { client } from "@/api/client";

export type CatDTO = { 
  _id: string;
  mimetype : string;
  size : number;
  tags: string[];
 }; // 고양이 데이터 타입 정의

export type GetCatsDTO = CatDTO[];

export const getCats = async (tag: string): Promise<GetCatsDTO> => {
  const url = `/api/cats?page=${10}&tag=${tag}`;
  try {
    const { data } = await client.get<GetCatsDTO>(url);
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('실패');
  }
};