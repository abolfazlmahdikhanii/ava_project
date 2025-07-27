export const getFileExtension = (url) => {
  if (!url) return "-";

  // Regex: Matches .ext at end of URL (ignores query params/hashes)
  const match = url.match(/\.([a-z0-9]+)(?:[?#]|$)/i);
  return match ? match[1].toLowerCase() : "-";
};

export const checkMediaType = (url) => {
  const isInternal =
    url.includes("harf.roshan-ai.ir/media/") || url.includes("tmpfiles.org/dl");
  const extension = getFileExtension(url);

  if (isInternal) {
    if (["webm", "ogg", "wav", "m4a", "mp3"].includes(extension)) {
      return "record";
    } else return "upload";
  }
  // External URLs (not from harf.roshan/media/)
  else if (url.startsWith("http://") || url.startsWith("https://")) {
    return "link";
  }

  return "unknown";
};

export const getDate = (date) => {
  const d = new Date(date);

  return new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export const formatDuration = (duration) => {
  const [h, m, s] = duration.split(":").map(parseFloat);
  if (h > 0)
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toFixed().padStart(2, "0")}`;
  if (m > 0) return `${m}:${s.toFixed().padStart(2, "0")}`;
  return `${m.toString().padStart(2, "0")}:${s.toFixed(0).padStart(2, "0")}`;
};

export const getUrlParam = (url, key) => {
  const urlParam = new URL(url);

  return urlParam.searchParams.get(key);
};
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
export const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const toastOption = {
  className: "custom-toast",
  delay: 300,
  closeButton: false,
  progress: 0,
  position: "top-center",
  hideProgressBar: true,
};
