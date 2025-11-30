// app/ep/[id]/page.js
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import episodes from "../../../data/episodes.json";

export default function EpisodePage() {
  // ✅ URL에서 바로 id 가져오기: /ep/ep18 → { id: "ep18" }
  const params = useParams();
  const id = params?.id;

  const episode = episodes.find((ep) => ep.id === id);

  // 전체 화면 뷰어용 인덱스 (null이면 닫힌 상태)
  const [viewerIndex, setViewerIndex] = useState(null);

  if (!episode) {
    return (
      <main className="neo-page min-h-screen">
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

  // /public/webtoon/{id}/1.png ~ n.png
  const images = Array.from(
    { length: episode.imageCount },
    (_, i) => `/webtoon/${episode.id}/${i + 1}.png`
  );

  const openViewer = (index) => {
    console.log("openViewer", index);
    setViewerIndex(index);
  };

  const closeViewer = () => {
    console.log("closeViewer");
    setViewerIndex(null);
  };

  return (
    <main className="neo-page min-h-screen py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 상단 헤더 */}
        <header className="mb-8">
          {/* 🔹 a 안에 button 넣지 말고 Link 자체를 버튼처럼 사용 */}
          <Link
            href="/"
            className="inline-flex mb-3 neo-button px-4 py-1 text-sm text-slate-700"
          >
            ← 목록
          </Link>

          <h1 className="text-base font-bold text-slate-900">
            {episode.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {episode.description}
          </p>
        </header>

        {/* 에피소드 이미지 리스트 */}
        <section className="neo-card p-3 pt-6">
  {images.map((src, idx) => (
    <div
      key={idx}
      className="w-full"
      style={{
        marginBottom: idx === images.length - 1 ? 0 : "64px", // 64px = 4rem 정도
      }}
    >
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
----------------------------- */
function FullscreenViewer({ images, initialIndex, onClose, title }) {
  const total = Array.isArray(images) ? images.length : 0;
  const safeInitial = typeof initialIndex === "number" ? initialIndex : 0;
  const [index, setIndex] = useState(
    safeInitial >= 0 && safeInitial < total ? safeInitial : 0
  );

  if (!total) return null;

  const goPrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goNext = () => {
    setIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  };

  const currentSrc = images[index];

  // 터치 스와이프 상태
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

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
      if (diff > 0) goNext(); // 왼쪽 스와이프 → 다음
      else goPrev();          // 오른쪽 스와이프 → 이전
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // ✅ 여기서는 Tailwind 안 쓰고, 전부 인라인 스타일로 강제
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 999999,         // 진짜 맨 위로!
        color: "#fff",
      }}
    >
      {/* 안쪽 클릭은 닫기 막기 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* 상단 바 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
            fontSize: 13,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.7)",
              background: "rgba(15,23,42,0.6)",
              color: "#f9fafb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            닫기 ✕
          </button>
          <div style={{ textAlign: "right", lineHeight: 1.2 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>
              {index + 1} / {total}
            </div>
          </div>
        </div>

        {/* 가운데 이미지 영역 */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 12px 20px",
          }}
        >
          <img
            src={currentSrc}
            alt={`${title} 뷰어`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* 좌/우 버튼 (PC에서 보기 편하게) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
            padding: "0 8px",
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            style={{
              pointerEvents: "auto",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.7)",
              background: "rgba(15,23,42,0.6)",
              color: "#f9fafb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ← 이전
          </button>
          <button
            type="button"
            onClick={goNext}
            style={{
              pointerEvents: "auto",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.7)",
              background: "rgba(15,23,42,0.6)",
              color: "#f9fafb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
}
