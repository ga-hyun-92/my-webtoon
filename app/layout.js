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
  title: "ANDREW 계시툰",
  description: "계시록 전장을 만화로 그려내는 계시툰",
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
