// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 간단한 방어코드 (없으면 빌드 시점에 바로 에러)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env 변수(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다."
  );
}

// ✅ 여기! named export 로 supabase를 내보냄
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
