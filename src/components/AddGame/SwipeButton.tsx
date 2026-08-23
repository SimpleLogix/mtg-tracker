import { useState } from "react";
import type { GameResult } from "../../utils/Game";

interface SwipeButtonProps {
  gameResult: GameResult;
  setGameResult: React.Dispatch<React.SetStateAction<GameResult>>;
}

export default function SwipeButton({
  gameResult,
  setGameResult,
}: SwipeButtonProps) {
  const [startX, setStartX] = useState<number>(0);
  const [deltaX, setDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const positions = {
    Loss: 0,
    Draw: -100,
    Win: -200,
  };

  //
  const getTransform = (gameResult: GameResult, deltaX: number) => {
    return `translateX(calc(${positions[gameResult]}% + ${deltaX}px))`;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setStartX(event.clientX);
  };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    // const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
    const buttonWidth = event.currentTarget.offsetWidth;
    const threshold = buttonWidth * 0.33;
    if (deltaX > threshold) {
      if (gameResult === "Win") {
        setGameResult("Draw");
      } else {
        setGameResult("Loss");
      }
    } else if (deltaX < -threshold) {
      if (gameResult === "Loss") {
        setGameResult("Draw");
      } else {
        setGameResult("Win");
      }
    }
    setIsDragging(false);
    setStartX(0);
    setDeltaX(0);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const maxBounce = event.currentTarget.offsetWidth * 0.42;
    const newDeltaX = event.clientX - startX;

    if (gameResult === "Loss" && newDeltaX > maxBounce) {
      setDeltaX(maxBounce);
    } else if (gameResult === "Win" && newDeltaX < -maxBounce) {
      setDeltaX(-maxBounce);
    } else {
      setDeltaX(newDeltaX);
    }
  };

  return (
    <div className="wld-button-wrapper">
      <div
        className="wld-button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="track"
          style={{
            transform: getTransform(gameResult, deltaX),
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div>Loss</div>
          <div>Draw</div>
          <div>Win</div>
        </div>
      </div>
    </div>
  );
}
