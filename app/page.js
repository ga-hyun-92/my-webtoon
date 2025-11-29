// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ep 숫자로 정렬
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="min-h-screen bg-slate-100">
      {/* 모바일/PC 공통 컨테이너 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-10 pb-10">
        {/* 헤더 */}
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

        {/* 목록: 모바일 1열, PC(>=md) 3열 */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                <article className="episode-grid-card h-full">
                  {/* 4:3 썸네일 */}
                  <div className="episode-grid-thumb">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="episode-grid-text mt-1.5">
                    {/* ✅ 모바일에서 더 크고, PC에서 살짝 작아짐 */}
                    <h2 className="font-bold text-[0.95rem] leading-snug md:text-[0.85rem] lg:text-[0.85rem] text-slate-900">
                      {ep.title}
                    </h2>

                    {/* 설명: 모바일/PC 모두 짧은 줄 간격 */}
                    <p className="mt-0.5 text-[0.7rem] md:text-[0.65rem] leading-snug text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>

                    {/* 하단 정보줄 */}
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
