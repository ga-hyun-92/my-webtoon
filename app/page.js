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
     <div className="max-w-4xl mx-auto px-0 md:px-4 py-6 md:py-10">

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

        {/* ✅ 카드 간격 한 칸 더 넓게 */}
        <ul className="space-y-7 md:space-y-7">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link href={`/ep/${ep.id}`} className="block">
                <article
  className="
    episode-card 
    w-full md:max-w-[700px]   /* PC에서는 820px만 */
    mx-auto                   /* 가운데 정렬 */
    flex items-center gap-3 md:gap-4
    px-3 py-3 md:px-5 md:py-4
    
  "
>


                  {/* 썸네일 */}
                  <div className="list-thumb">
                    <img
                      src={`/webtoon/${ep.id}/1.png`}
                      alt={`${ep.title} 첫 컷`}
                    />
                  </div>

                  {/* ✅ 텍스트 폭을 모바일에서 더 줄이기 (줄 길이 짧게) */}
                 <div className="flex-1 min-w-0 max-w-[65%] md:max-w-none flex flex-col justify-center">
  {/* 제목 */}
  <h2 className="text-sm md:text-lg font-semibold text-slate-900 leading-tight m-0 line-clamp-2">
    {ep.title}
  </h2>

  {/* 설명 – 바로 아래 줄에 딱 붙게 */}
  <p className="text-xs md:text-sm text-slate-600 leading-snug m-0 line-clamp-2">
    {ep.description}
  </p>

  {/* 하단 EP / 절 정보 */}
  <div className="mt-1 flex items-center justify-between text-[11px] md:text-sm text-slate-500">
    <span className="inline-flex items-center gap-1">
      <span className="inline-block h-4 w-1 rounded-full bg-emerald-500" />
      <span className="uppercase tracking-wide">{ep.id}</span>
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