import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import md5 from "md5"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGravatarUrl(email: string, size: number = 80): string {
  const hash = md5(email.toLowerCase().trim())
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`
}
