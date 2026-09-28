/**
 * Safe localStorage wrapper. Never throws — storage can fail (private
 * browsing, quota exceeded, disabled storage) and callers should be able
 * to treat a failure the same as "nothing was stored".
 */

const NAMESPACE = "convoy";

const namespacedKey = (key) => `${NAMESPACE}:${key}`;

export function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(namespacedKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] failed to read "${key}"`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (typeof window === "undefined") return { ok: false, error: "no-window" };
  try {
    window.localStorage.setItem(namespacedKey(key), JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    console.warn(`[storage] failed to write "${key}"`, error);
    return { ok: false, error };
  }
}

export function removeStorage(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(namespacedKey(key));
  } catch (error) {
    console.warn(`[storage] failed to remove "${key}"`, error);
  }
}
