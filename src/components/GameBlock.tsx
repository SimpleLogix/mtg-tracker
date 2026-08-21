import { formatRelativeDate, type Game } from "../types/Game";

interface GameBlockProps {
  game: Game;
}

export default function GameBlock({ game }: GameBlockProps) {
  return (
    <div className="game-block">
      <div>{game.commander.name}</div>
      <div>{game.result}</div>
      <div>{formatRelativeDate(game.date)}</div>
    </div>
  );
}
