export default function calculateBytesToSize(bytes?: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  bytes = Number(bytes);

  if (bytes === 0) return '알 수 없음';

  let i = 0;
  // 1024 단위로 변환
  while (((i === 0 && bytes >= 1024) || (i !== 0 && bytes >= 1000)) && i < sizes.length - 1) {
    if(i === 0) {
      bytes /= 1024;
      i++;
    }
    else {
      bytes /= 1000;
      i++;
    }
  }

  return `${bytes.toFixed(1)} ${sizes[i]}`;
}
