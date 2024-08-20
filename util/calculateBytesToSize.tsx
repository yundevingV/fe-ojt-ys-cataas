export default function calculateBytesToSize(bytes? : number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  bytes = Number(bytes);

  if (bytes === 0) return 'n/a';

  const i: number = Math.floor(Math.log(bytes) / Math.log(1024)); // 수정된 부분

  if (i === 0) return `${bytes} ${sizes[i]}`; // 수정된 부분

  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}
