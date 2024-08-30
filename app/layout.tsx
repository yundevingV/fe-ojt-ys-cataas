// app/layout.tsx
'use client'; // 클라이언트 컴포넌트로 설정

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/header/Header";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          <Header 
            openSearchModal={openSearchModal}
            setOpenSearchModal={setOpenSearchModal}
          />
          {children} {/* 페이지 콘텐츠가 이곳에 렌더링됩니다. */}
        </body>  
            </QueryClientProvider>
    </html>
  );
}
