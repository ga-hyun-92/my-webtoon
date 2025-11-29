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
      {/* ✅ 모바일에서 좌우 여백 조금 줄이기: px-3 / 데스크탑은 px-4 */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-8 md:py-10">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            ANDREW 계시툰
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-600 flex items-center gap-1">
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>
        </header>

        {/* ✅ 카드 간격 조금 더 넓게: space-y-5 / md에서 6 */}
        <ul className="space-y-5 md:space-y-6">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                {/* ✅ 카드가 컨테이너 폭 다 쓰도록 w-full, 
                    내부여백 ↑, 썸네일과 텍스트 간격 살짝 줄임 */}
                <article
                  className="
                    episode-card w-full
                    flex items-center gap-3 md:gap-5
                    px-4 py-4 md:px-6 md:py-4
                  "
                >
                  {/* 썸네일은 그대로 */}
                  <div className="list-thumb">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  {/* ✅ 텍스트 영역 너비를 모바일에서 조금 줄이기:
                      max-w-[70%] → 글줄 길이가 너무 길지 않게 */}
                  <div className="flex-1 min-w-0 max-w-[70%] md:max-w-none flex flex-col justify-center gap-1">
                    <h2 className="text-sm md:text-lg font-semibold text-slate-900 line-clamp-2">
                      {ep.title}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-4 w-1 rounded-full bg-emerald-500" />
                        <span className="uppercase tracking-wide">
                          {ep.id}
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
