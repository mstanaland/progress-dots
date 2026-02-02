import cx from "clsx";

import styles from "./ProgressDots.module.css";

interface ProgressDotsProps {
  total: number;
  currentIndex: number;
}

const MAX_VISIBLE_DOTS = 5;
const HALF_VISIBLE = Math.floor(MAX_VISIBLE_DOTS / 2); // 2
const EDGE_THRESHOLD = HALF_VISIBLE + 1; // 3

type DotState = "active" | "normal" | "edge" | "offscreen";

export function ProgressDots({ total, currentIndex }: ProgressDotsProps) {
  const needsTransform =
    total > MAX_VISIBLE_DOTS && currentIndex > HALF_VISIBLE;
  const maxTransformUnits = total - MAX_VISIBLE_DOTS;
  const transformUnits = needsTransform
    ? Math.min(currentIndex - HALF_VISIBLE, maxTransformUnits)
    : 0;

  const dots = Array.from({ length: total }, (_, index) => {
    const dotState = getDotState(index, currentIndex, total);

    return (
      <div
        key={index}
        className={cx(styles.dot, {
          [styles.activeDot]: dotState === "active",
          [styles.edgeDot]: dotState === "edge",
          [styles.offscreenDot]: dotState === "offscreen",
        })}
      />
    );
  });

  return (
    <div
      className={styles.progressDots}
      role="img"
      aria-label={`Image ${currentIndex + 1} of ${total}`}
    >
      <div
        className={cx(styles.track, {
          [styles.center]: total <= MAX_VISIBLE_DOTS,
        })}
        style={{ "--p": transformUnits } as React.CSSProperties}
      >
        {dots}
      </div>
    </div>
  );
}

function getDotState(
  index: number,
  currentIndex: number,
  total: number,
): DotState {
  if (index === currentIndex) return "active";
  if (total <= MAX_VISIBLE_DOTS) return "normal";

  const isAtLeftEdge = currentIndex < EDGE_THRESHOLD;
  const isAtRightEdge = currentIndex >= total - EDGE_THRESHOLD;
  const distanceFromCurrent = Math.abs(index - currentIndex);

  if (isAtLeftEdge) {
    if (index > MAX_VISIBLE_DOTS - 1) return "offscreen";
    if (index > MAX_VISIBLE_DOTS - 2) return "edge";
  } else if (isAtRightEdge) {
    if (index < total - MAX_VISIBLE_DOTS) return "offscreen";
    if (index < total - MAX_VISIBLE_DOTS + 1) return "edge";
  } else {
    if (distanceFromCurrent > HALF_VISIBLE) return "offscreen";
    if (distanceFromCurrent > HALF_VISIBLE - 1) return "edge";
  }

  return "normal";
}
