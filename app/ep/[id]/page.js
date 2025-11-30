// app/ep/[id]/page.js
"use client";

import { useState, useEffect, useRef } from "react";
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
                // 핀치줌은 브라우저 기본 확대/축소를 그대로 사용
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
 * - 부드러운 전환 애니메이션 (fade + 살짝 슬라이드)
 * - 상하 스크롤 락 / 더블탭 줌 / PC 방향 버튼
 */
function FullscreenViewer({ images, initialIndex, onClose, title }) {
  const [index, setIndex] = useState(initialIndex);
  const [anim, setAnim] = useState("");        // slide-left / slide-right / fadeIn
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStart = useRef(null);

  // 상하 스크롤 락 (document 안전하게 체크)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = original;
      };
    }
  }, []);

  const goPrev = () => {
    if (index === 0) return;
    setAnim("slide-right");
    setIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (index === images.length - 1) return;
    setAnim("slide-left");
    setIndex((prev) => prev + 1);
  };

  // 터치 스와이프
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    // 좌우 스와이프만 인식 (상하 스크롤은 무시)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext(); // 왼쪽으로 밀기 → 다음 컷
      else goPrev();        // 오른쪽으로 밀기 → 이전 컷
    }

    touchStart.current = null;
  };

  // 더블탭 줌
  const handleDoubleClick = () => {
    setIsZoomed((prev) => !prev);
  };

  // 애니메이션 상태 reset
  useEffect(() => {
    if (!anim) return;
    const timer = setTimeout(() => setAnim(""), 250);
    return () => clearTimeout(timer);
  }, [anim]);

  const currentSrc = images[index];

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[9999] flex flex-col select-none"
      onClick={onClose} // 바깥 영역 클릭 시 닫기
    >
      {/* 상단 바: 닫기 + 인덱스 */}
      <div
        className="pt-safe flex items-center justify-between px-4 py-3
                   text-white text-sm bg-gradient-to-b from-black/70 to-transparent"
        onClick={(e) => e.stopPropagation()} // 상단 바 클릭은 닫기 막기
      >
        <button
          onClick={onClose}
          className="neo-button-light px-3 py-1 text-xs font-semibold"
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

      {/* 가운데 이미지 영역 */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden touch-pan-y"
        onClick={(e) => e.stopPropagation()} // 이미지 영역 클릭은 닫기 막기
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${title} 뷰어`}
          draggable={false}
          className={`
            max-h-[90vh] w-auto object-contain 
            transition-transform duration-200
            ${isZoomed ? "scale-150" : "scale-100"}
            ${
              anim === "slide-left"
                ? "animate-slideLeft"
                : anim === "slide-right"
                ? "animate-slideRight"
                : "animate-fadeIn"
            }
          `}
        />

        {/* PC 화살표 버튼 */}
        <button
          type="button"
          onClick={goPrev}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 
                     text-white text-4xl opacity-60 hover:opacity-100"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 
                     text-white text-4xl opacity-60 hover:opacity-100"
        >
          ›
        </button>
      </div>
    </div>
  );
}
