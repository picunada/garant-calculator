import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
