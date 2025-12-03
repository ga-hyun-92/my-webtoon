// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="min-h-screen bg-slate-100">
      {/* 상단 헤더 - 좌우/위 여백 넉넉하게 */}
      <div 
        className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-10"
          style={{
                          paddingLeft: "0px", paddingRight: "14px" 
                          
  }}
        >
        <header 
          className="mb-4 md:mb-6"
          style={{
           marginLeft: "12px", marginTop: "18px"     // 헤더 위 여백
           }} >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            A-BIBLE 계시툰
          </h1>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600 flex items-center gap-1"
          >
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>
        </header>

        {/* 👉 목록 그리드: 모바일 2열, PC 3열 */}
        <ul className="episode-grid-layout list-none">
      
          {sortedEpisodes.map((ep) => (
            <li className="list-none" key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                <article className="episode-grid-card h-full">
                  {/* 4:3 썸네일 */}
                  <div className="episode-grid-thumb">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  <div
  className="episode-grid-text mt-1.5"
  style={{
    // 텍스트 영역을 세로 플렉스 박스로 만들기
    display: "flex",
    flexDirection: "column",
    minHeight: "3rem",
  }}
>
  <h2 className="episode-grid-title text-slate-900">
    {ep.title}
  </h2>

  <p className="episode-grid-desc text-slate-600 line-clamp-2 mt-0.5">
    {ep.description}
  </p>

  {/* ⬇⬇⬇ 남는 공간을 다 먹는 투명 스페이서 */}
  <div style={{ flexGrow: 1 }} />

  {/* ⬇⬇⬇ EP / 절 정보 줄 – 항상 맨 아래 붙음 */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "6px",   // 위와 살짝 띄우기
      paddingTop: "4px",  // 안쪽 여백
      fontSize: "0.65rem",
      color: "#6b7280",   // text-slate-500 비슷한 색
    }}
  >
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <span
        style={{
          display: "inline-block",
          height: "12px",
          width: "4px",
          borderRadius: "999px",
          backgroundColor: "#22c55e", // emerald-500
        }}
      />
      <span style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {ep.id.toUpperCase()}
      </span>
    </span>
    <span>1~{ep.imageCount}절</span>
  </div>
</div>

                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
