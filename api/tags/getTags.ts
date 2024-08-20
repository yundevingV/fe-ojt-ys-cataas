import { client } from "@/api/client";

export type GetTagsDTO = string[];

export const getTags = async ( ): Promise<GetTagsDTO> => {
  const url = `/api/tags`;
  try {
    const response = await client.get<GetTagsDTO>(url);
    return response.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('실패');
  }
};