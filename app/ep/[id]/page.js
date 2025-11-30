// app/ep/[id]/page.js
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import episodes from "../../../data/episodes.json";

export default function EpisodePage() {
  const pathname = usePathname();        // 예: "/ep/ep18"
  const segments = pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // "ep18"

  const episode = episodes.find((ep) => ep.id === id);

  // 전체 화면 뷰어용 인덱스 (null이면 닫힌 상태)
  const [viewerIndex, setViewerIndex] = useState(null);

  if (!episode) {
    return (
      <main className="neo-page min-h-screen">
        <div className="max-w-2xl mx-auto p-6">
          <p className="mb-3">없는 회차입니다 🥲 (id: {String(id || "")})</p>
          <Link href="/" className="text-blue-500 underline">
            ← 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  // /webtoon/{id}/1.png ~ n.png
  const images = Array.from(
    { length: episode.imageCount },
    (_, i) => `/webtoon/${episode.id}/${i + 1}.png`
  );

  const openViewer = (index) => {
    console.log("openViewer", index); // ▶ 디버깅용
    setViewerIndex(index);
  };

  const closeViewer = () => {
    console.log("closeViewer"); // ▶ 디버깅용
    setViewerIndex(null);
  };

  return (
    <main className="neo-page min-h-screen py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 상단 헤더 */}
        <header className="mb-4">
          <Link href="/" className="inline-block mb-3">
            <button className="neo-button px-4 py-1 text-sm text-slate-700">
              ← 목록
            </button>
          </Link>
          <h1 className="text-base font-bold text-slate-900">
            {episode.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{episode.description}</p>
        </header>

        {/* 에피소드 이미지 리스트 */}
        <section className="neo-card p-3 space-y-4">
          {images.map((src, idx) => (
            <div key={idx} className="w-full">
              <Image
                src={src}
                alt={`${episode.title} 컷 ${idx + 1}`}
                width={1080}
                height={1350}
                className="w-full h-auto rounded-xl cursor-pointer"
                onClick={() => openViewer(idx)}
              />
            </div>
          ))}
        </section>
      </div>

      {/* 전체 화면 뷰어 오버레이 */}
      {viewerIndex !== null && (
        <FullscreenViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={closeViewer}
          title={episode.title}
        />
      )}
    </main>
  );
}

/* -----------------------------
   전체 화면 이미지 뷰어 (최소 버전)
   - 배경 어둡게 + 큰 이미지 + 닫기
   - 좌/우 버튼 + 터치 스와이프
   - 일부 고급 기능(키보드/스크롤락)은 잠깐 빼둔 상태
----------------------------- */
function FullscreenViewer({ images, initialIndex, onClose, title }) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const currentSrc = images[index];

  const goPrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goNext = () => {
    setIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  // 터치 스와이프
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
      setTouchEndX(null);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 1) {
      setTouchEndX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();  // 왼쪽으로 스와이프 → 다음 컷
      else goPrev();           // 오른쪽으로 스와이프 → 이전 컷
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
      onClick={onClose}  // 바깥 영역 클릭 시 닫기
    >
      {/* 안쪽 컨텐츠 클릭은 닫기 막기 */}
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 바: 닫기 버튼 + 인덱스 */}
        <div className="flex items-center justify-between px-4 py-3 text-white text-sm bg-gradient-to-b from-black/80 to-transparent">
          <button
            onClick={onClose}
            className="neo-button-light text-xs font-semibold"
          >
            닫기 ✕
          </button>

          <div className="text-right leading-tight">
            <div className="font-semibold text-base">{title}</div>
            <div className="text-xs opacity-75">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* 가운데 이미지 영역 + 터치 핸들러 */}
        <div
          className="flex-1 flex items-center justify-center px-3 pb-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={currentSrc}
            src={currentSrc}
            alt={`${title} 뷰어`}
            className="viewer-image max-w-full max-h-full object-contain"
          />
        </div>

        {/* PC용 좌/우 버튼 */}
        <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto neo-button-light text-sm"
            onClick={goPrev}
          >
            ← 이전
          </button>
          <button
            type="button"
            className="pointer-events-auto neo-button-light text-sm"
            onClick={goNext}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
}
