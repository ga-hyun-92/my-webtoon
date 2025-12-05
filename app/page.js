// app/page.js
"use client";   // ⬅ 클라이언트 컴포넌트로

import { useEffect, useState } from "react";
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  const sortedEpisodes = [...episodes].sort((a, b) => {
    const numA = parseInt(a.id.replace("ep", ""), 10);
    const numB = parseInt(b.id.replace("ep", ""), 10);
    return numA - numB;
  });

  // 🔹 각 회차별 마지막 읽은 절
  const [lastPerEpisode, setLastPerEpisode] = useState({});
  // 🔹 최근 본 회차
  const [lastEpisodeInfo, setLastEpisodeInfo] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const perEpisode = {};

    episodes.forEach((ep) => {
      const raw = window.localStorage.getItem(`last-${ep.id}-index`);
      if (raw !== null) {
        const n = Number(raw);
        if (!Number.isNaN(n)) {
          perEpisode[ep.id] = n;
        }
      }
    });

    setLastPerEpisode(perEpisode);

    const lastId = window.localStorage.getItem("lastEpisodeId");
    if (lastId && perEpisode[lastId] !== undefined) {
      const ep = episodes.find((e) => e.id === lastId);
      setLastEpisodeInfo({
        id: lastId,
        title: ep ? ep.title : lastId,
        index: perEpisode[lastId],
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      {/* 상단 헤더 - 좌우/위 여백 넉넉하게 */}
      <div
        className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-10"
        style={{
          paddingLeft: "0px",
          paddingRight: "14px",
        }}
      >
        <header
          className="mb-4 md:mb-6"
          style={{
            marginLeft: "12px",
            marginTop: "18px", // 헤더 위 여백
          }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            A-BIBLE 계시툰
          </h1>
          <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600 flex items-center gap-1">
            <span className="text-emerald-500">💡</span>
            계시록 전장을 만화로 그려내는 계시툰
            <span className="text-emerald-500">💡</span>
          </p>

          {/* 🔥 최근 본 회차 배지 */}
          {lastEpisodeInfo && (
            <div
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "#ecfdf5",
                color: "#047857",
                fontSize: "0.75rem",
              }}
            >
              <span>⏱ 최근 본 회차</span>
              <Link
                href={`/ep/${lastEpisodeInfo.id}`}
                className="underline font-semibold"
              >
                {lastEpisodeInfo.title}
              </Link>
              <span style={{ opacity: 0.8 }}>
                ({lastEpisodeInfo.index + 1}절까지)
              </span>
            </div>
          )}
        </header>

        {/* 👉 목록 그리드: 모바일 2열, PC 3열 */}
        <ul className="episode-grid-layout list-none">
          {sortedEpisodes.map((ep) => {
            const lastIdx = lastPerEpisode[ep.id];
            const hasProgress = typeof lastIdx === "number";

            return (
              <li className="list-none" key={ep.id}>
                <Link href={`/ep/${ep.id}`} className="block">
                  <article className="episode-grid-card h-full">
                    {/* 4:3 썸네일 */}
                    <div className="episode-grid-thumb">
                      <img
                        src={`/webtoon/${ep.id}/1.png`}
                        alt={`${ep.title} 첫 컷`}
                      />
                    </div>

                    <div
                      className="episode-grid-text mt-1.5"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "3rem",
                      }}
                    >
                      <h2 className="episode-grid-title text-slate-900">
                        {ep.title}
                      </h2>

                      <p className="episode-grid-desc text-slate-600 line-clamp-2 mt-0.5">
                        {ep.description}
                      </p>

                      {/* 남는 공간 채우기 */}
                      <div style={{ flexGrow: 1 }} />

                      {/* EP / 절 정보 줄 */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                          paddingTop: "4px",
                          fontSize: "0.65rem",
                          color: "#6b7280",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              height: "12px",
                              width: "4px",
                              borderRadius: "999px",
                              backgroundColor: "#22c55e", // emerald-500
                            }}
                          />
                          <span
                            style={{
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {ep.id.toUpperCase()}
                          </span>
                        </span>
                        <span>1~{ep.imageCount}절</span>
                      </div>

                      {/* ⏱ 이 회차의 마지막 읽은 절 표시 */}
                      {hasProgress && (
                        <div className="mt-0.5 text-[0.6rem] font-medium text-emerald-600">
                          ⏱ {lastIdx + 1}절까지 읽었어요
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
