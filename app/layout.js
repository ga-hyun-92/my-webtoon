// app/layout.js
import "./globals.css";

export const metadata = {
  title: "ANDREW 계시툰",
  description: "계시록 전장을 만화로 그려내는 계시툰",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ 여기서 모바일 / PC 폭을 확실하게 나눠줌 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
