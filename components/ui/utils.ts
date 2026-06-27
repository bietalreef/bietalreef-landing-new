import { clsx, type ClassValue } from "clsx@2.1.1";
import { twMerge } from "tailwind-merge@2.6.0";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}