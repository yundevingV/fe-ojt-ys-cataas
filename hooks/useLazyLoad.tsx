import { useEffect, useRef, useState } from 'react';

export default function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 요소가 보이면 관찰 종료
        }
      },
      {
        root: null, // 뷰포트를 기준으로
        threshold: 0.2, // 20%가 보일 때 콜백 실행
      }
    );

    if (ref.current) {
      observer.observe(ref.current); // 요소 관찰 시작
    }

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 해제
    };
  }, []);

  return { ref, isVisible };
}