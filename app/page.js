// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // ✔ ep 숫자로 오름차순 정렬: ep19 → ep20 → ep21
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">ANDREW 계시툰</h1>
          <p className="text-base text-gray-600 mt-1">
            💡계시록 전장을 만화로 그려내는 계시툰! 💡
          </p>
        </header>

        <ul className="space-y-3">
          {sortedEpisodes.map((ep) => (
            <li key={ep.id}>
              <Link
                href={`/ep/${ep.id}`}
                className="flex gap-3 border rounded-xl px-4 py-3 bg-white hover:bg-slate-50 transition"
              >
                {/* 썸네일: 1번 컷 사용 */}
                <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={`/webtoon/${ep.id}/1.png`}
                    alt={ep.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-lg font-semibold truncate">{ep.title}</div>
                  <div className="text-ms text-gray-500 mt-1 line-clamp-2">
                    {ep.description}
                  </div>
                  <div className="text-[14px] text-gray-400 mt-1">
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
