"use client";

import { useState } from "react";

export default function AnimatedCard() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition-colors"
      >
        {show ? "Hide" : "Show"} Card
      </button>

      {show && (
        <div
          className="
            mt-6 w-80 p-6 rounded-xl shadow-lg bg-white
            animate-in fade-in zoom-in duration-700
          "
        >
          <h2 className="text-xl font-semibold text-gray-800">Animated Card 🎉</h2>
          <p className="mt-2 text-gray-600">
            This card uses <code>tailwindcss-animate</code> classes:{" "}
            <span className="font-mono text-sm">animate-in fade-in zoom-in</span>.
          </p>
        </div>
      )}
    </div>
  );
}
