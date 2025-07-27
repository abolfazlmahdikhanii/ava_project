<<<<<<< HEAD
=======
import toast from "react-hot-toast";

>>>>>>> 574ed32 (Add solution for challenge 4)
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
<<<<<<< HEAD
=======
export const timeToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export function formatFileSize(bytes, decimalPlaces = 2) {
  if (bytes === 0) return "۰ بایت";

  const k = 1024;
  const sizes = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const formattedNumber = (bytes / Math.pow(k, i)).toFixed(decimalPlaces);

  const persianNumber = formattedNumber
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  return persianNumber + " " + sizes[i];
}



export const copyTextHandler = async (segments) => {
  if (!segments?.some((item) => item.text?.trim() !== "")) {
    toast.error("متن قابل کپی وجود ندارد", toastOption);
    return;
  }

  const txt = segments.map((item) => item.text).join(" ");

  try {
    await navigator.clipboard.writeText(txt);
    toast.success("متن با موفقیت کپی شد", toastOption);
  } catch (err) {
    toast.error("کپی کردن متن با مشکل مواجه شد", toastOption);
  }
};
>>>>>>> 574ed32 (Add solution for challenge 4)

export const toastOption = {
  className: "custom-toast",
  delay: 300,
  closeButton: false,
  progress: 0,
  position: "top-center",
  hideProgressBar: true,
};
