import {
  formatRelativeDate,
  type Game,
  type GameResult,
} from "../../utils/Game";
import { removeGame } from "../../utils/LocalStorage";
import CommanderColors from "../Stats/CommanderColors";

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
  const gameResultIcon: Record<GameResult, string> = {
    Win: "Crown",
    Loss: "Skull",
    Draw: "Handshake",
  };

  return (
    <div className="game-card-wrapper">
      <div className="game-card" onClick={onClick}>
        <div
          className="game-card-art"
          style={{ backgroundImage: `url(${game.commander.img_url})` }}
        ></div>

        <div className="game-card-middle">
          <div>
            <div className="game-card-commander">{game.commander.name}</div>
            <CommanderColors color_identity={game.commander.color_identity} />
          </div>

          <div className="game-card-date">{formatRelativeDate(game.date)}</div>
        </div>

        <div className={`${game.result} game-card-end`}>
          <span className="material-symbols-outlined">
            {gameResultIcon[game.result]}
          </span>
          <div className="game-card-commander-record">
            {game.commanderRecord}
          </div>
        </div>
      </div>

      <button
        className="delete-game-button"
        style={{
          transform: isUserEditing ? "" : "scale(0)",
          marginLeft: isUserEditing ? "12px" : "0px",
        }}
        onClick={() => {
          onRemove(game.id);
          removeGame(game);
        }}
      >
        <span className="material-symbols-outlined">
          {isUserEditing ? "Remove" : ""}
        </span>
      </button>
    </div>
  );
}
