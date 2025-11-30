// app/ep/[id]/page.js
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import episodes from "../../../data/episodes.json";

export default function EpisodePage() {
  const pathname = usePathname(); // 예: "/ep/ep20"
  const segments = pathname.split("/").filter(Boolean);
  const id = segments[segments.length - 1]; // 맨 끝 값 = "ep20"

  const episode = episodes.find((ep) => ep.id === id);

  // 전체 화면 뷰어용 현재 인덱스 (null = 닫힘)
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

  // imageCount만 보고 /webtoon/{id}/1.png ~ n.png 자동 생성
  const images = Array.from(
    { length: episode.imageCount },
    (_, i) => `/webtoon/${episode.id}/${i + 1}.png`
  );

  const openViewer = (index) => {
    setViewerIndex(index);
  };

  const closeViewer = () => {
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

        {/* 웹툰 이미지들 */}
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
                // 핀치줌/더블탭 줌은 브라우저 기본 확대/축소 기능 사용
              />
            </div>
          ))}
        </section>
      </div>

      {/* 전체 화면 뷰어 */}
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

/**
 * 전체 화면 이미지 뷰어 컴포넌트
 * - 핀치줌: 모바일 브라우저 기본 확대/축소 사용 (우리가 막지 않음)
 * - 좌/우 스와이프: 터치 제스처로 컷 이동
 * - 상단 닫기/인덱스 표시
 * - 부드러운 전환 애니메이션 (globals.css의 viewerFadeSlideIn 사용)
 * - PC 방향 버튼 UI
 */
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

    // 스와이프 감지 threshold (px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 왼쪽으로 밀었음 → 다음 컷
        goNext();
      } else {
        // 오른쪽으로 밀었음 → 이전 컷
        goPrev();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
      onClick={onClose} // 바깥 영역 클릭 시 닫힘
    >
      {/* 안쪽 컨텐츠 클릭이 밖으로 전파되지 않도록 */}
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 바: 닫기 + 인덱스 표시 */}
        <div className="flex items-center justify-between px-4 py-3 text-white text-sm bg-gradient-to-b from-black/70 to-transparent">
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

        {/* 가운데 영역: 이미지 뷰 */}
        <div
          className="flex-1 flex items-center justify-center px-3 pb-6 relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={currentSrc} // 인덱스 바뀔 때마다 애니메이션 다시 적용
            src={currentSrc}
            alt={`${title} 뷰어`}
            className="viewer-image max-w-full max-h-full object-contain"
            draggable={false}
          />

          {/* PC 방향 버튼 (중간 좌우) */}
          <button
            type="button"
            onClick={goPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
