// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ep 숫자로 정렬: ep18 → ep19 → ep20 ...
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="min-h-screen bg-slate-100">
      {/* 헤더 여백 + 좌우 여백 */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-10">
        {/* 헤더 영역 */}
        <header className="mb-5 md:mb-7">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            ANDREW 계시툰
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-600 flex items-center gap-1">
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>
        </header>

        {/* ✅ 여기! 그리드 설정 */}
        {/* - 모바일: 1열
            - 태블릿(sm~): 2열
            - PC(lg 이상): 무조건 3열 */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id} className="flex">
              <Link href={`/ep/${ep.id}`} className="flex-1">
                {/* 네모 카드 전체 */}
                <article className="episode-card episode-grid-card h-full flex flex-col">
                  {/* 썸네일 (가로가 살짝 더 긴 3:4 비율 느낌) */}
                  <div className="episode-grid-thumb mb-2 overflow-hidden rounded-xl">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="episode-grid-text">
                    {/* 제목 */}
                    <h2 className="episode-title mb-0.5">
                      {ep.title}
                    </h2>

                    {/* 설명 (2줄까지만) */}
                    <p className="episode-desc line-clamp-2">
                      {ep.description}
                    </p>

                    {/* EP / 절 수 */}
                    <div className="episode-meta mt-1 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-4 w-1 rounded-full bg-emerald-500" />
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
