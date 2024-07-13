// @typescript-eslint/no-explicit-any @typescript-eslint/no-unsafe-argument

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return format(date, "PPpp"); // Customize the format as needed
};
