import axios from "axios";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}`;

export const client = axios.create({
  baseURL: API_ENDPOINT,
});