/**
 * Pseudo APIs
 */

import { MOCK_PRODUCTS } from "./data";

const FAKE_API_DELAY: number = 2e3;

export const fake_fetch = async <T>(
  url: string,
  method: string
): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS as any);
    }, FAKE_API_DELAY);
  });
};
