// app/ep/[id]/page.js
import episodes from "../../../data/episodes.json";
import Image from "next/image";
import Link from "next/link";

export default function EpisodePage({ params }) {
  // params가 undefined거나 id가 없을 경우 대비해서 기본값 ep20 설정
  const id = params?.id ?? "ep20";

  // 디버깅용으로 서버 콘솔에 찍어보기 (터미널에 보일 거야)
  console.log("EpisodePage params:", params, "resolved id:", id);

  const episode = episodes.find((ep) => ep.id === id);

  if (!episode) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p>없는 회차입니다 🥲 (id: {String(id)})</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          ← 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header className="mb-4 flex items-center justify-between">
        <Link href="/" className="text-sm text-blue-500 underline">
          ← 목록
        </Link>
        <h1 className="text-lg font-semibold text-right">{episode.title}</h1>
      </header>

      <section className="space-y-4">
        {episode.images.map((src, idx) => (
          <div key={idx} className="w-full">
            <Image
              src={src}
              alt={`${episode.title} 컷 ${idx + 1}`}
              width={1080}
              height={1350}
              className="w-full h-auto"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
