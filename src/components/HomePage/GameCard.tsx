import { formatRelativeDate, type Game } from "../../utils/Game";
import { removeGame } from "../../utils/LocalStorage";

interface GameCardProps {
  game: Game;
  isUserEditing: boolean;
  onRemove: (gameID: string) => void;
  onClick: () => void;
}

export default function GameCard({
  game,
  isUserEditing,
  onRemove,
  onClick,
}: GameCardProps) {
  return (
    <div className="game-card-wrapper">
      <div className="game-card" onClick={onClick}>
        <div
          className="game-card-art"
          style={{ backgroundImage: `url(${game.commander.img_url})` }}
        >
          {" "}
        </div>

        <div className="game-card-middle">
          <div className="game-card-commander">{game.commander.name}</div>
          <div className="game-card-date">{formatRelativeDate(game.date)}</div>
        </div>

        <div
          className="game-card-end"
          style={{
            color:
              game.result === "Win"
                ? "#FFC312"
                : game.result === "Loss"
                  ? "#b33939"
                  : "#d1ccc0",
          }}
        >
          <span className="material-symbols-outlined">
            {game.result === "Win"
              ? "Crown"
              : game.result === "Loss"
                ? "Skull"
                : "Handshake"}
          </span>
        </div>
      </div>

      <button
        className="delete-game-button"
        style={{ display: isUserEditing ? "" : "none" }}
        onClick={() => {
          onRemove(game.id);
          removeGame(game);
        }}
      >
        <span className="material-symbols-outlined">Remove</span>
      </button>
    </div>
  );
}
