import '@testing-library/jest-dom/extend-expect';

export {};

declare global {
  interface Window {
    google: any;
  }
}