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
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        {/* 상단 헤더: 네이버툰 느낌 심플 헤더 */}
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

        {/* 회차 목록 */}
        <ul className="space-y-4 md:space-y-5">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                <article
                  className="
                    flex items-center gap-4 md:gap-6
                    rounded-xl bg-white border border-slate-200
                    px-4 py-3 md:px-5 md:py-4
                    shadow-sm
                    hover:border-emerald-400 hover:shadow-md hover:bg-emerald-50/40
                    transition
                  "
                >
                  {/* 왼쪽 썸네일 : 크기 고정 (규격 통일) */}
                  <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-md bg-slate-200 flex-shrink-0">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 오른쪽 텍스트 박스 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                    {/* 제목 */}
                    <h2 className="text-base md:text-lg font-semibold text-slate-900 truncate">
                      {ep.title}
                    </h2>

                    {/* 설명 */}
                    <p className="text-xs md:text-sm text-slate-600 line-clamp-2">
                      {ep.description}
                    </p>

                    {/* 하단 메타 정보 : ep번호 + 절수 */}
                    <div className="mt-1 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block h-4 w-1 rounded-full bg-emerald-500" />
                        <span className="uppercase tracking-wide">
                          {ep.id}
                        </span>
                      </span>
                      <span className="text-slate-500">총 {ep.imageCount}절</span>
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
