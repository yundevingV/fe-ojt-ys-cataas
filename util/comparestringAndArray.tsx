export default function compareStringAndArray(value: string | null, array?: string[]): boolean {
  
  console.log(value,array)
  // 1. value가 string인지 확인
  if (typeof value !== 'string') {
    throw new Error('value는 string이어야 합니다.');
  }

  // 2. array가 string[]인지 확인
  if (!Array.isArray(array) || !array.every(item => typeof item === 'string')) {
    throw new Error('array는 string[]이어야 합니다.');
  }

  // 3. value를 쉼표로 분리하여 배열로 변환
  const valueArray = value.split(',').map(item => item.trim());

  // 4. 모든 요소가 같을 때만 true 반환
  return valueArray.length === array.length && valueArray.every(item => array.includes(item));
}