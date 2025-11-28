// app/page.js
import Link from "next/link";
import episodes from "../data/episodes.json";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ANDREW 계시툰</h1>
      <p className="text-sm text-gray-600 mb-6">
        계시록 전장을 만화로 그려내는 계시툰! 💑
      </p>

      <ul className="space-y-3">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <Link
              href={'/ep/${ep.id}'}
              className="block border rounded-lg px-4 py-3 hover:bg-gray-50"
            >
              <div className="font-semibold">{ep.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {ep.description}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
