// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ep 숫자로 오름차순 정렬: ep18 → ep19 → ep20 ...
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="neo-page min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 상단 헤더 */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            ANDREW 계시툰
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            💡 계시록 전장을 만화로 그려내는 계시툰 💡
          </p>
        </header>

        {/* 회차 목록 */}
        <ul className="space-y-5">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                {/* ▶ 뉴모피즘 카드 */}
                <article className="neo-card flex items-center gap-4 md:gap-6 px-5 py-4 md:px-6 md:py-5">
                  {/* 왼쪽 썸네일 (세로보다 가로가 살짝 긴 직사각형) */}
                  <div className="w-28 md:w-32 h-20 md:h-24 overflow-hidden rounded-xl bg-slate-200/60 flex-shrink-0">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 오른쪽 텍스트 영역 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                    {/* 제목 */}
                    <h2 className="text-base md:text-lg font-semibold text-slate-900 truncate">
                      {ep.title}
                    </h2>

                    {/* 설명 */}
                    <p className="text-xs md:text-sm text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>

                    {/* 하단 메타: ep번호 + 절 수 */}
                    <div className="mt-1 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
                      <span className="uppercase tracking-wide">
                        {ep.id}
                      </span>
                      <span>총 {ep.imageCount}절</span>
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
