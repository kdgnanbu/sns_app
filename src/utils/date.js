function formatDateJP(isoString) {
  const date = new Date(isoString);

  // 日本時間に変換
  const options = {
     year: "numeric", 
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  };

  const formatter = new Intl.DateTimeFormat("ja-JP", options);
  const parts = formatter.formatToParts(date);

  // 自由に加工できるようにパーツを取り出す
    const year = parts.find(p => p.type === "year").value;
  const month = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;
  const hour = parts.find(p => p.type === "hour").value;
  const minute = parts.find(p => p.type === "minute").value;

  return `${year}年${month}月${day}日 ${hour}時${minute}分`;
}