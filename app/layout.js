// app/layout.js
import "./globals.css";
import localFont from "next/font/local";

// ✅ SUIT Variable 폰트 설정 (파일 1개만 사용)
const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2", // ← 방금 넣은 폰트 경로
  // 만약 ttf라면: "./fonts/SUIT-Variable.ttf"
  variable: "--font-suit",            // CSS 변수 이름
  weight: "100 900",                  // 이 가변폰트가 커버하는 굵기 범위
  display: "swap",                    // 깜빡임 최소화
});

export const metadata = {
    // ❗ 도메스 정보 (OG 절대경로 만들 때 사용)
  metadataBase: new URL("https://my-webtoon.vercel.app"),
  title: "A-BIBLE 계시툰 | 요한계시록 웹툰 뷰어",
  description: "요한계시록 전장을 웹툰으로 쉽게 보는 온라인 뷰어",

  openGraph: {
    title: "A-BIBLE 계시툰 – 계시록 전장 그림",
    description: "전장의 흐름을 한눈에, 성경 계시록을 웹툰으로 쉽게 보는 온라인 뷰어",
    url: "https://my-webtoon.vercel.app",
    siteName: "A-BIBLE 계시툰",
    type: "website",
    locale: "ko_KR",
   images: [
      {
        // ✅ 절대 경로 + 새 파일명
        url: "https://my-webtoon.vercel.app/og-v2.png",
        width: 1200,
        height: 630,
        alt: "ANDREW 계시툰 로고",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A-BIBLE 계시툰 | 요한계시록 웹툰 뷰어",
    description: "웹툰으로 읽는 요한계시록 — 전장의 흐름을 한눈에",
    images: ["https://my-webtoon.vercel.app/og-v2.png"],
  },
};

// ✅ Next 13+ 권장 방식: viewport 별도 export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
