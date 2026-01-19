import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
  }

  if (response.status === 204) {
      return null;
  }
  
  return response.json();
};