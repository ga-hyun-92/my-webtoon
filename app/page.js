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
      {/* 모바일 / PC 모두에서 가운데 정렬, 폭 제한 */}
      <div className="max-w-5xl mx-auto px-3 md:px-6 py-6 md:py-10">
        {/* 헤더 */}
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

        {/* ✅ 에피소드 그리드 (모바일 2열, md 이상 3열, lg에서 4열) */}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
          {sortedEpisodes.map((ep) => {
            const num = parseInt(ep.id.replace("ep", ""), 10);

            return (
              <li key={ep.id}>
                <Link href={`/ep/${ep.id}`} className="block">
                  <article className="episode-grid-card">
                    {/* 4:3 썸네일 */}
                    <div className="episode-grid-thumb">
                      <img
                        src={`/webtoon/${ep.id}/1.png`}
                        alt={`${ep.title} 첫 컷`}
                      />
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="episode-grid-text">
                      {/* EP 라벨 */}
                      <p className="text-[10px] md:text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                        EP{num}
                      </p>

                      {/* 제목 (두 줄까지만) */}
                      <h2 className="text-xs md:text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                        {ep.title}
                      </h2>

                      {/* 설명: 모바일에서는 숨기고, md 이상에서 1~2줄만 */}
                      <p className="hidden md:block text-[11px] text-slate-600 leading-snug line-clamp-2">
                        {ep.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}