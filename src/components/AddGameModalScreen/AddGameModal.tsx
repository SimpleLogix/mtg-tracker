import Modal from "./Modal";
import type { Commander, Game, GameResult } from "../../utils/Game";
import { useState } from "react";
import {
  addCommander,
  loadCommanders,
  removeCommander,
  saveCommanderStats,
  saveGame,
  savePlayerStats,
} from "../../utils/LocalStorage";
import CommanderSearch from "./CommanderSearch";
import {
  generateCommanderStats,
  generatePlayerStats,
  type CommanderStats,
  type PlayerStats,
} from "../../utils/Stats";
import PillButton from "./PillButton";

interface AddGameModalProps {
  onClose: () => void;
  onGameAdded: (
    game: Game,
    commanderStats: Map<string, CommanderStats>,
    playerStats: PlayerStats,
  ) => void;
  commanderStats: Map<string, CommanderStats>;
}

export default function AddGameModal({
  onClose,
  onGameAdded,
  commanderStats,
}: AddGameModalProps) {
  const [commanders, setCommanders] = useState<Commander[]>(loadCommanders);
  const [selectedCommander, setSelectedCommander] = useState<Commander | null>(
    commanders[0] || null,
  );

  const [showInput, setShowInput] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult>("Draw");

  // Add & Remove Commanders directly from the state
  const handleAddCommander = (commander: Commander) => {
    setCommanders((prev) => {
      if (prev.some((c) => c.id === commander.id)) {
        return prev;
      }

      addCommander(commander);
      return [commander, ...prev];
    });
  };

  const handleRemoveCommander = (commander: Commander) => {
    removeCommander(commander); // localStorage

    setCommanders((prev) => prev.filter((c) => c.id !== commander.id));
  };

  const handleSelectCommander = (commander: Commander) => {
    if (editMode) {
      removeCommander(commander);
      handleRemoveCommander(commander);
      setShowInput(false);
    } else {
      setSelectedCommander(commander);
      setShowInput(false);
      setEditMode(false);
    }
  };

  const handleSaveGame = () => {
    if (selectedCommander) {
      const now = new Date();

      // update Commander Win/Loss Record
      const currentRecord = commanderStats.get(selectedCommander.id)
        ?.winLossDrawTotal ?? [0, 0, 0];
      const newRecord = [...currentRecord];
      if (gameResult === "Win") newRecord[0]++;
      if (gameResult === "Loss") newRecord[1]++;
      if (gameResult === "Draw") newRecord[2]++;

      // Create a new Game Object
      const newGame: Game = {
        id: crypto.randomUUID(),
        commander: selectedCommander,
        result: gameResult,
        date: now.toDateString(),
        commanderRecord: newRecord.join("-"),
      };

      //save & return new list of games
      const updatedGames = saveGame(newGame);
      // generate stats from the list
      const updatedPlayerStats = generatePlayerStats(updatedGames);
      const updatedCommanderStats = generateCommanderStats(updatedGames);

      // save to local storage
      saveCommanderStats(updatedCommanderStats);
      savePlayerStats(updatedPlayerStats);

      onGameAdded(newGame, updatedCommanderStats, updatedPlayerStats);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      {showInput && (
        <CommanderSearch
          onSelect={(commander) => {
            handleAddCommander(commander);
            setSelectedCommander(commander);
            setShowInput(false);
            setEditMode(false);
          }}
        />
      )}

      <div className="commander-container-wrapper">
        <div>
          <button
            className="commander-container"
            onClick={() => {
              setShowInput(true);
              setSelectedCommander(null);
              setEditMode(false);
            }}
          >
            <span className="material-symbols-outlined">Add</span>
          </button>
          <div>Add Commander</div>
        </div>

        {/* Iterate and Display saved commanders */}
        {commanders.map((commander) => (
          <div
            key={commander.id}
            onClick={() => {
              handleSelectCommander(commander);
            }}
          >
            <div
              className={`commander-container ${
                selectedCommander?.id === commander.id ? "selected" : ""
              }`}
              style={{
                backgroundImage: `url(${commander.img_url})`,
              }}
            >
              {editMode && (
                <div className="delete-button">
                  <span className="material-symbols-outlined">Remove</span>
                </div>
              )}
            </div>
            <div>{commander.name}</div>
          </div>
        ))}

        {/* EDIT COMMANDERS */}
        <div>
          <button
            className={`commander-container ${editMode ? "selected-edit" : ""}`}
            onClick={() => {
              setShowInput(false);
              setSelectedCommander(null);
              setEditMode(!editMode);
            }}
          >
            <span className="material-symbols-outlined">Delete</span>
          </button>
          <div>Edit Commanders</div>
        </div>
      </div>

      <PillButton gameResult={gameResult} setGameResult={setGameResult} />
      <div className="save-button-wrapper">
        <button className="save-button" onClick={handleSaveGame}>
          <span className="material-symbols-outlined">save</span>
        </button>
      </div>
    </Modal>
  );
}
