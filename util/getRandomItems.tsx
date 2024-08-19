export default function getRandomItems(arr: string[], count: number): string[] {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞음
  return shuffled.slice(0, count); // 처음 8개의 요소를 반환
}