"use client";
export default function Close(close) {
  return (
    <button
      onClick={() => close(() => false)}
      className="absolute w-8 h-8 bg-red-400 rounded-full -top-4 -right-4 "
    >
      X
    </button>
  );
}
