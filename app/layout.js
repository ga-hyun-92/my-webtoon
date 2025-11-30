// app/layout.js
import "./globals.css";

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
