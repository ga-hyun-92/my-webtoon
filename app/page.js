// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  // 최신 회차가 위에 오게 뒤집기 (원하면 제거해도 됨)
  const sorted = [...episodes].reverse();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">ANDREW 계시툰</h1>
          <p className="text-sm text-gray-600 mt-1">
             💡계시록 전장을 만화로 그려내는 계시툰! 💡
          </p>
        </header>

        <ul className="space-y-3">
          {sorted.map((ep) => (
            <li key={ep.id}>
              <Link
                href={`/ep/${ep.id}`}
                className="flex gap-3 border rounded-xl px-4 py-3 bg-white hover:bg-slate-50 transition"
              >
                {/* 썸네일: 1번 컷 사용 */}
                <div className="w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={`/webtoon/${ep.id}/1.png`}
                    alt={ep.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{ep.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {ep.description}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    컷 수: {ep.imageCount}장
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
