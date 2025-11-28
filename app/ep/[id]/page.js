"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import episodes from "../../../data/episodes.json";

export default function EpisodePage() {
  const pathname = usePathname(); // 예: "/ep/ep20"
  const segments = pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // 맨 끝 값 → "ep20"

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

  const images = Array.from(
    { length: episode.imageCount },
    (_, i) => `/webtoon/${episode.id}/${i + 1}.png`
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-4">
        <header className="mb-4">
  <Link
    href="/"
    className="text-xs text-blue-500 underline hover:text-blue-600 block mb-2"
  >
    ← 목록
  </Link>

  <h1 className="text-lg font-semibold">{episode.title}</h1>
  <p className="text-xs text-gray-500 mt-1">{episode.description}</p>
</header>


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
