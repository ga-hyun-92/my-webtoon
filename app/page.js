// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ep 숫자로 오름차순 정렬: ep19 → ep20 → ep21
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="neo-page min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            ANDREW 계시툰
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            💡 계시록 전장을 만화로 그려내는 계시툰 💡
          </p>
        </header>

        {/* 에피소드 리스트 */}
        <ul className="space-y-4">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                <article className="neo-card flex gap-4 md:gap-5 px-4 py-3 md:px-5 md:py-4 items-center">
                  {/* 왼쪽: 썸네일(작게 고정) */}
                  <div className="neo-thumb w-24 h-24 md:w-28 md:h-28 overflow-hidden flex-shrink-0">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷 썸네일`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 오른쪽: 텍스트 영역 */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-lg font-semibold text-slate-900 truncate">
                      {ep.title}
                    </h2>

                    <p className="mt-1 text-xs md:text-sm text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>

                    <p className="mt-2 text-[11px] md:text-xs text-slate-500">
                      총 {ep.imageCount}컷
                    </p>
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
