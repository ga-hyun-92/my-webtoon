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
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="mb-2">
          <h1 className="text-3xl font-bold text-slate-800">
            ANDREW 계시툰
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            💡 계시록 전장을 만화로 그려내는 계시툰 💡
          </p>
        </header>

        <ul className="space-y-4">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link
                href={`/ep/${ep.id}`}
                className="neo-card flex gap-4 px-4 py-3 items-center cursor-pointer"
              >
                {/* 뉴모피즘 썸네일 */}
                <div className="neo-thumb w-20 h-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={`/webtoon/${ep.id}/1.png`}
                    alt={ep.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-semibold text-slate-900 truncate">
                    {ep.title}
                  </div>
                  <div className="text-[13px] text-slate-600 mt-1 line-clamp-2">
                    {ep.description}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    1~{ep.imageCount}절
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
