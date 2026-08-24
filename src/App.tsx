import { useState } from "react";
import "./styles/App.css";
import GameCard from "./components/HomePage/GameCard";
import AddGameModal from "./components/AddGameModalScreen/AddGameModal";
import BottomHomeShelf from "./components/HomePage/BottomShelf";
import { loadGames } from "./utils/LocalStorage";
import type { Commander, Game } from "./utils/Game";
import PlayerStatsModal from "./components/Stats/PlayerStatsModal";
import CommanderStatsModal from "./components/Stats/CommanderStatsModal";
import { loadCommanderStats, type CommanderStats } from "./utils/Stats";
// import { loadStats } from "./utils/Stats";

const localCommanderStats = loadCommanderStats();

function App() {
  const [games, setGames] = useState<Game[]>(loadGames);
  const [commanderStats, setCommanderStats] =
    useState<Map<string, CommanderStats>>(localCommanderStats);

  const [isUserEditing, setIsUserEditing] = useState(false);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [openPlayerStatsModal, setOpenPlayerStatsModal] = useState(false);
  const [openCommanderStatsModal, setOpenCommanderStatsModal] = useState(true);
  const [selectedCommander, setSeletectedCommander] =
    useState<Commander | null>(games[0].commander);

  return (
    <>
      <section className="recent-games">
        {games.map((game, index) => (
          <GameCard
            key={index.toString()}
            game={game}
            onClick={() => {
              setSeletectedCommander(game.commander);
              setOpenCommanderStatsModal(true);
            }}
            isUserEditing={isUserEditing}
            onRemove={() =>
              setGames((prev) => prev.filter((g) => g.id !== game.id))
            }
          />
        ))}
      </section>

      <BottomHomeShelf
        setOpenAddGameModal={setOpenAddGameModal}
        setOpenStatsModal={setOpenPlayerStatsModal}
        setIsUserEditing={setIsUserEditing}
      />

      {openAddGameModal && (
        <AddGameModal
          onClose={() => setOpenAddGameModal(false)}
          onGameAdded={(game, commanderSats) => {
            setGames((prev) => [game, ...prev]);
            setCommanderStats(commanderSats)
          }}
        />
      )}

      {openPlayerStatsModal && (
        <PlayerStatsModal onClose={() => setOpenPlayerStatsModal(false)} />
      )}

      {openCommanderStatsModal && selectedCommander !== null && (
        <CommanderStatsModal
          commander={selectedCommander}
          commanderStats={commanderStats.get(selectedCommander.id)!}
          onClose={() => setOpenCommanderStatsModal(false)}
        />
      )}
    </>
  );
}

export default App;
