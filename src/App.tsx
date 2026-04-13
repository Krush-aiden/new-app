import React from "react";
import Counter from "./components/Counter";
import { add, multiply, formatResult, sumArray } from "./utils/calc";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(5);
  const b = 3;
  const numbers = [1, 2, 3, 4];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">New</h1>
        <p className="text-gray-600">
          This is a minimal Tailwind + TypeScript demo.
        </p>
        <div className="mt-4">
          <div className="text-sm text-gray-700">
            {formatResult(add(count, b))} • multiply: {multiply(count, b)}
          </div>
          <div className="text-sm text-gray-700 mt-2">
            sumArray([1,2,3,4]) = {sumArray(numbers)}
          </div>
        </div>

        <div className="mt-6">
          <Counter initial={count} step={2} onChange={setCount} />
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Primary
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700">
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
}
