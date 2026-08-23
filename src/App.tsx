import { useState } from "react";
import "./styles/App.css";
import GameCard from "./components/HomePage/GameCard";
import AddGameModal from "./components/AddGameModalScreen/AddGameModal";
import BottomHomeShelf from "./components/HomePage/BottomShelf";
import { loadGames } from "./utils/LocalStorage";
import type { Game } from "./utils/Game";
import StatsModal from "./components/Stats/StatsModal";

function App() {
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [openStatsModal, setOpenStatsModal] = useState(true);
  const [isUserEditing, setIsUserEditing] = useState(false);

  const [games, setGames] = useState<Game[]>(loadGames);

  return (
    <>
      <section className="recent-games">
        {games.map((game, index) => (
          <GameCard
            key={index.toString()}
            game={game}
            isUserEditing={isUserEditing}
            onRemove={() =>
              setGames((prev) => prev.filter((g) => g.id !== game.id))
            }
          />
        ))}
      </section>

      <BottomHomeShelf
        setOpenAddGameModal={setOpenAddGameModal}
        setOpenStatsModal={setOpenStatsModal}
        setIsUserEditing={setIsUserEditing}
      />

      {openAddGameModal && (
        <AddGameModal
          onClose={() => setOpenAddGameModal(false)}
          onGameAdded={(game) => setGames((prev) => [game, ...prev])}
        />
      )}

      {openStatsModal && (
        <StatsModal onClose={() => setOpenStatsModal(false)} />
      )}
    </>
  );
}

export default App;
