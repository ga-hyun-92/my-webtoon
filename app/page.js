// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ep 숫자 기준 오름차순 정렬 (ep18 → ep19 → ep20 ...)
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="min-h-screen bg-slate-100">
      {/* 상단 여백 + 좌우 여백 + 전체 최대 폭 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-10">
        {/* 헤더 영역 */}
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            ANDREW 계시툰
          </h1>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600 flex items-center gap-1">
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>
        </header>

        {/* 🔥 네이버웹툰 스타일 카드 그리드
            - .episode-grid-layout: globals.css 에 정의 (모바일 2열, PC 3열) */}
        <ul className="episode-grid-layout">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id} className="h-full">
              <Link href={`/ep/${ep.id}`} className="block h-full">
                {/* .episode-grid-card: 뉴모피즘 카드 + 높이 맞추기 */}
                <article className="episode-grid-card h-full">
                  {/* 4:3 썸네일 – .episode-grid-thumb 가 비율 유지 */}
                  <div className="episode-grid-thumb">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  {/* 텍스트 영역 – 제목/설명/EP 정보 */}
                  <div className="episode-grid-text mt-1.5">
                    {/* 모바일/PC 따로 크기 잡는 클래스 (.episode-grid-title) */}
                    <h2 className="episode-grid-title text-slate-900 line-clamp-2">
                      {ep.title}
                    </h2>

                    <p className="episode-grid-desc text-slate-600 line-clamp-2 mt-0.5">
                      {ep.description}
                    </p>

                    <div className="mt-1 flex items-center justify-between text-[0.65rem] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-3 w-1 rounded-full bg-emerald-500" />
                        <span className="uppercase tracking-wide">
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
