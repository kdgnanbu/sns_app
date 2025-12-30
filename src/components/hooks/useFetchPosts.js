// src/components/hooks/useFetchPosts.js

import { useState } from "react";

export function useFetchPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * 共通 fetch 関数
   * 
   * @param {string} url API URL
   * @param {function} setter useState の set
   */
  const fetchData = async (url, setter) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error("Fetch error:", res.status, text);
        throw new Error("API エラー");
      }

      const data = await res.json();
      setter(data);

    } catch (err) {
      console.error("fetchData error:", err);
      setError("データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchData,
    loading,
    error,
  };
}
