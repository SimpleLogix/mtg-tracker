import { useState } from "react";
import "./App.css";
import GameBlock from "./components/GameBlock";
import AddGameModal from "./components/AddGameModal";
import type { Commander, Game } from "./types/Game";

function App() {
  const [showAddGame, setShowAddGame] = useState(true);
  const today = new Date().toISOString();
  const c1: Commander = {
    id: "1",
    name: "Chatterfang",
    img_url: "na",
    colors: ["d"],
  }
    const c2: Commander = {
      id: "2",
    name: "Rocco",
    img_url: "na",
    colors: ["e"],
  }
  const games: Game[] = [
    {
      commander: c1,
      result: "Win",
      date: today,
    },
    {
      commander: c1,
      result: "Win",
      date: "2026-08-06T20:00:00",
    },
    {
      commander: c1,
      result: "Win",
      date: today,
    },
    {
      commander: c2,
      result: "Win",
      date: "2026-08-06T20:00:00",
    },
    {
      commander: c1,
      result: "Win",
      date: today,
    },
    {
      commander: c2,
      result: "Win",
      date: "2026-08-06T20:00:00",
    },
    {
      commander: c1,
      result: "Win",
      date: today,
    },
    {
      commander: c2,
      result: "Win",
      date: "2026-08-06T20:00:00",
    },
        {
      commander: c1,
      result: "Win",
      date: today,
    },
    {
      commander: c2,
      result: "Win",
      date: "2026-08-06T20:00:00",
    },
  ];

  return (
    <>
      <section className="recent-games">
        {games.map((game) => (
          <GameBlock game={game} />
        ))}
      </section>

      <section className="bottom-shelf">
        <button onClick={() => setShowAddGame(true)}>
          <span className="material-symbols-outlined">edit_square</span>
        </button>
        <button>
          <span className="material-symbols-outlined">bar_chart</span>
        </button>
      </section>

      {showAddGame && <AddGameModal onClose={() => setShowAddGame(false)} />}
    </>
  );
}

export default App;
