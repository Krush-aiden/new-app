import React, { useState } from "react";

interface CounterProps {
  initial?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default function Counter({
  initial = 0,
  step = 1,
  onChange,
}: CounterProps) {
  const [count, setCount] = useState<number>(initial);

  function setAndNotify(next: number) {
    setCount(next);
    onChange?.(next);
  }

  function inc() {
    setAndNotify(count + step);
  }

  function dec() {
    setAndNotify(count - step);
  }

  return (
    <div className="flex items-center gap-3">
      <button className="px-3 py-1 bg-gray-200 rounded" onClick={dec}>
        -
      </button>
      <div className="min-w-[2rem] text-center">{count}</div>
      <button className="px-3 py-1 bg-gray-200 rounded" onClick={inc}>
        +
      </button>
    </div>
  );
}
