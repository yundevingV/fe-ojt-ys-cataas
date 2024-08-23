export default function convertUTCToKST(utcDate: "" | Date | undefined): string | undefined {
  // utcDate가 유효한 경우에만 처리
  if (utcDate) {
    const date = new Date(utcDate);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    // 변환된 한국 시간 포맷
    const kstTime = date.toLocaleString('ko-KR', options);

    // "년 월 일" 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    
    const time = kstTime.split(" ")[3]; // 시간 부분만 추출 (HH:mm:ss 형식)

    return `${year}년 ${month}월 ${day}일 ${time}`;
  }

  // utcDate가 유효하지 않은 경우
  return undefined;
}
