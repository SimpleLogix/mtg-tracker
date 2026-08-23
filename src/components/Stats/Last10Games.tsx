import type { GameResult } from "../../utils/Game";

interface Last10GamesProps {
  gameResults: GameResult[];
}

export default function Last10Games({ gameResults }: Last10GamesProps) {
  return (
    <div className="last-ten-games">
      {gameResults.map((gameResult, index) => {
        return (
          <div
            key={index}
            className={`${gameResult === "Win" ? "win" : ""}`}
          ></div>
        );
      })}
    </div>
  );
}
