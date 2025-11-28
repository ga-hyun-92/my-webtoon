// app/ep/[id]/page.js
import episodes from "../../../data/episodes.json";
import Image from "next/image";
import Link from "next/link";

export default function EpisodePage({ params }) {
  const { id } = params || {};
  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto p-6">
          <p className="mb-3">
            없는 회차입니다 🥲 (id: {String(id || "")})
          </p>
          <Link href="/" className="text-blue-500 underline">
            ← 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  // imageCount만 보고 /webtoon/{id}/1.png ~ n.png 자동 생성
  const images = Array.from(
    { length: episode.imageCount },
    (_, i) => `/webtoon/${episode.id}/${i + 1}.png`
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* 상단 헤더 */}
        <header className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-blue-500 underline hover:text-blue-600"
          >
            ← 목록
          </Link>
          <div className="text-right">
            <h1 className="text-lg font-semibold">{episode.title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {episode.description}
            </p>
          </div>
        </header>

        {/* 웹툰 이미지들 */}
        <section className="bg-white rounded-xl shadow-sm p-3 space-y-4">
          {images.map((src, idx) => (
            <div key={idx} className="w-full">
              <Image
                src={src}
                alt={`${episode.title} 컷 ${idx + 1}`}
                width={1080}
                height={1350}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
