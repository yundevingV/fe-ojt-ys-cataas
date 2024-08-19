// app/layout.tsx
'use client'; // 클라이언트 컴포넌트로 설정

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          {children} {/* 페이지 콘텐츠가 이곳에 렌더링됩니다. */}
        </body>  
            </QueryClientProvider>
    </html>
  );
}
