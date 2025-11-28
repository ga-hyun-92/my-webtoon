import "./globals.css";

export const metadata = {
  title: "ANDREW 계시툰",
  description: "소모임 전용 웹툰 뷰어",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
