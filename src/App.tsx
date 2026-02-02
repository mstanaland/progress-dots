import * as React from "react";

import { ProgressDots } from "./ProgressDots";

export function App() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const total = 12;
  return (
    <div className="app">
      <ProgressDots total={total} currentIndex={currentIndex} />

      <div className="navButtons">
        <button
          onClick={() =>
            setCurrentIndex((prev) => {
              if (prev <= 0) return 0;
              return prev - 1;
            })
          }
        >
          Previous
        </button>
        <div>
          {currentIndex + 1} / {total} ({currentIndex})
        </div>
        <button
          onClick={() =>
            setCurrentIndex((prev) => {
              if (prev >= total - 1) return total - 1;
              return prev + 1;
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
