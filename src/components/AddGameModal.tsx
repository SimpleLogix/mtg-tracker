import Modal from "./Modal";
import CommanderSearch from "./CommanderSearch";
import type { Commander } from "../types/Game";
import { useState } from "react";
import { loadCommanders, removeCommander } from "../utils/Utils";

interface AddGameModalProps {
  onClose: () => void;
}

export default function AddGameModal({ onClose }: AddGameModalProps) {
  const [selectedCommander, setSelectedCommander] = useState<Commander | null>(
    null,
  );
  const [commanders, setCommanders] = useState<Commander[]>(loadCommanders);
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Add & Remove Commanders directly from the state
  const handleAddCommander = (commander: Commander) => {
    setCommanders((prev) => {
      if (prev.some((c) => c.id === commander.id)) {
        return prev;
      }

      return [commander, ...prev];
    });
  };

  const handleRemoveCommander = (commander: Commander) => {
    removeCommander(commander); // localStorage

    setCommanders((prev) => prev.filter((c) => c.id !== commander.id));
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
          <div
            className="commander-container"
            onClick={() => {
              setShowInput(true);
              setSelectedCommander(null);
              setEditMode(false);
            }}
          >
            <span className="material-symbols-outlined">Add</span>
          </div>
          <div>Add Commander</div>
        </div>

        {/* Iterate and Display saved commanders */}
        {commanders.map((commander) => (
          <div
            id={commander.id}
            onClick={() => {
              if (editMode) {
                removeCommander(commander);
                handleRemoveCommander(commander);
                setShowInput(false);
              } else {
                setSelectedCommander(commander);
                setShowInput(false);
                setEditMode(false);
              }
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

        <div>
          <div
            className={`commander-container ${editMode ? "selected-edit" : ""}`}
            onClick={() => {
              setShowInput(false);
              setSelectedCommander(null);
              setEditMode(!editMode);
            }}
          >
            <span className="material-symbols-outlined">Delete</span>
          </div>
          <div>Edit Commanders</div>
        </div>
      </div>

      <div className="tick"></div>

      <div className="wld-buttons-wrapper">
        <button>L</button>
        <button>D</button>
        <button>W</button>
      </div>
    </Modal>
  );
}
