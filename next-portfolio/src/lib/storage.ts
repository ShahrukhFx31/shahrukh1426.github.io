import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

export async function getStorageUrl(path: string): Promise<string> {
  const r = ref(storage, path);
  return await getDownloadURL(r);
}

export async function fetchJsonFromStorage<T>(path: string): Promise<T> {
  const url = await getStorageUrl(path);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return (await res.json()) as T;
}


