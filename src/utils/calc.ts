export type Operation = (a: number, b: number) => number;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function formatResult(value: number): string {
  return `Result: ${value}`;
}

export const sumArray = (numbers: number[]): number => numbers.reduce((s, n) => s + n, 0);
