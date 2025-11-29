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
      {/* 전체 컨테이너 */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pb-10">
        {/* 헤더 영역 – 위/왼쪽 여백 */}
        <header className="mt-9 sm:mt-12 mb-4 sm:mb-6 pl-3 sm:pl-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            ANDREW 계시툰
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 flex items-center gap-1">
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>
        </header>

        {/* 그리드 목록: 모바일 2열, PC(중간 이상)는 3열 고정 */}
        <section className="mt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {sortedEpisodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/ep/${ep.id}`}
                className="block"
              >
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
                    {/* 🔡 모바일 title 글자 크기 조절 포인트 */}
                    <h2 className="text-[14px] sm:text-sm md:text-base font-semibold text-slate-900 line-clamp-2">
                      {ep.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs text-slate-500">
                      <span className="uppercase tracking-wide">
                        {ep.id}
                      </span>
                      <span>1~{ep.imageCount}절</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
