export default function calculateDateDifference (createdAt: Date | string | undefined) {
  if (!createdAt) return 0; // 등록일이 없으면 0 반환

  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // 두 날짜의 차이를 밀리초로 계산
  const differenceInTime = currentDate.getTime() - createdDate.getTime();

  // 밀리초를 일수로 변환
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};
