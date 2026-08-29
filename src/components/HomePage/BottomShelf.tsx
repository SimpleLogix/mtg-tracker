// import {
//   clearCommanders,
//   clearGames,
//   clearStats,
// } from "../../utils/LocalStorage";

interface BottomHomeShelfProps {
  setOpenAddGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenStatsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomHomeShelf({
  setOpenAddGameModal,
  setOpenStatsModal,
  setIsUserEditing,
}: BottomHomeShelfProps) {
  return (
    <section className="bottom-shelf">
      <button onClick={() => setOpenStatsModal(true)}>
        <span className="material-symbols-outlined">bar_chart</span>
      </button>

      <button
        className="add-game-button"
        onClick={() => setOpenAddGameModal(true)}
      >
        <span className="material-symbols-outlined ">add</span>
      </button>

      <button
        onClick={() => {
          setIsUserEditing((prev) => !prev);
        }}
      >
        <span className="material-symbols-outlined">Edit</span>
      </button>

      {/* <button
        onClick={() => {
          clearCommanders();
          clearGames();
          clearStats();
        }}
      >
        <span
          style={{
            color: "var(--red)",
          }}
          className="material-symbols-outlined"
        >
          Warning
        </span>
      </button> */}
    </section>
  );
}
