import { useRef, useState } from "react";
import type { GameResult } from "../../utils/Game";

interface PillButtonProps {
  gameResult: GameResult;
  setGameResult: React.Dispatch<React.SetStateAction<GameResult>>;
}

export default function PillButton({
  gameResult,
  setGameResult,
}: PillButtonProps) {
  const [startX, setStartX] = useState<number>(100);
  const [deltaX, setDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const pillWidthPercent = 33;
  const positions: Record<GameResult, string> = {
    Loss: "0%",
    Draw: `calc(50% - ${pillWidthPercent / 2}%)`,
    Win: `calc(100% - ${pillWidthPercent}%)`,
  };
  //
  const getTransform = (deltaX: number) => `translateX(${deltaX}px)`;

  const pillRef = useRef<HTMLDivElement>(null);
  const baseDeltaXRef = useRef<number>(0);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    const trackRect = event.currentTarget.getBoundingClientRect();
    const pillRect = pillRef.current!.getBoundingClientRect();
    const pillWidthPx = pillRect.width;

    const actualCurrentLeft = pillRect.left - trackRect.left;
    const trackWidth = trackRect.width;
    const clickX = event.clientX - trackRect.left;

    let desiredLeft = clickX - pillWidthPx / 2;
    desiredLeft = Math.min(Math.max(desiredLeft, 0), trackWidth - pillWidthPx);

    const initialDeltaX = desiredLeft - actualCurrentLeft;

    baseDeltaXRef.current = initialDeltaX; // store the jump as the baseline
    setDeltaX(initialDeltaX);
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const trackWidth = event.currentTarget.offsetWidth;
    const pillWidthPx = trackWidth * (pillWidthPercent / 100);

    const leftMap: Record<GameResult, number> = {
      Loss: 0,
      Draw: trackWidth * 0.5 - pillWidthPx / 2,
      Win: trackWidth - pillWidthPx,
    };

    const currentLeft = leftMap[gameResult];
    const projectedLeft = currentLeft + deltaX;

    let closest: GameResult = gameResult;
    let minDist = Infinity;
    (Object.keys(leftMap) as GameResult[]).forEach((state) => {
      const dist = Math.abs(leftMap[state] - projectedLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = state;
      }
    });

    baseDeltaXRef.current = 0;
    setIsDragging(false);
    setStartX(0);
    setDeltaX(0);
    setGameResult(closest)
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const trackWidth = event.currentTarget.offsetWidth;
    const pillWidthPx = trackWidth * (pillWidthPercent / 100);

    const leftMap: Record<GameResult, number> = {
      Loss: 0,
      Draw: trackWidth * 0.5 - pillWidthPx / 2,
      Win: trackWidth - pillWidthPx,
    };
    const currentLeftPx = leftMap[gameResult];

    const minDelta = -currentLeftPx;
    const maxDelta = trackWidth - pillWidthPx - currentLeftPx;

    const movedSinceDown = event.clientX - startX;
    const newDeltaX = baseDeltaXRef.current + movedSinceDown; // add to baseline, don't replace

    setDeltaX(Math.min(Math.max(newDeltaX, minDelta), maxDelta));
  };

  return (
    <div className="pill-button-wrapper">
      <div
        className="pill-button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="pill-button-bg">
          <span>Loss</span>
          <span>Draw</span>
          <span>Win</span>
        </div>
        <div
          className="pill"
          ref={pillRef}
          style={{
            left: positions[gameResult],
            transform: getTransform(deltaX),
            transition: isDragging
              ? "none"
              : "left 0.3s ease, transform 0.3s ease",
          }}
        >
          {!isDragging ? gameResult : ""}
        </div>
      </div>
    </div>
  );
}
