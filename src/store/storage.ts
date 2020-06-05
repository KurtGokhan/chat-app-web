import { GlobalSettings } from "./model";

/**
 * Get and parse an object stored in the localStorage.
 * Returns `undefined` if nothing is found or an error occurs.
 */
export function getStoredData<T = any>(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') as T;
  } catch {
    return undefined;
  }
}

/**
 * Serialize and store an object in the localStorage.
 */
export function saveStoredData<T = any>(key: string, object: T) {
  localStorage.setItem(key, JSON.stringify(object));
}


/**
 * The settings stored in the local storage. `undefined` if not existing.
 */
export const storedSettings = getStoredData<GlobalSettings>('settings');
