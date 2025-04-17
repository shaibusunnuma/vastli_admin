import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import lodashDebounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): DebouncedFunc<T> {
  return lodashDebounce(callback, delay);
}
