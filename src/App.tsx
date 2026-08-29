import { useState } from "react";
import "./styles/App.css";
import GameCard from "./components/HomePage/GameCard";
import AddGameModal from "./components/AddGameModalScreen/AddGameModal";
import BottomHomeShelf from "./components/HomePage/BottomShelf";
import {
  loadCommanderStats,
  loadGames,
  loadPlayerStats,
} from "./utils/LocalStorage";
import type { Commander, Game } from "./utils/Game";
import PlayerStatsModal from "./components/Stats/PlayerStatsModal";
import CommanderStatsModal from "./components/Stats/CommanderStatsModal";
import type { PlayerStats, CommanderStats } from "./utils/Stats";
// import { loadStats } from "./utils/Stats";

const localCommanderStats = loadCommanderStats();
const localPlayerStats = loadPlayerStats();

function App() {
  const [games, setGames] = useState<Game[]>(loadGames); // game-card list view
  const [commanderStats, setCommanderStats] =
    useState<Map<string, CommanderStats>>(localCommanderStats);
  const [playerStats, setPlayerStats] = useState<PlayerStats>(localPlayerStats);

  const [isUserEditing, setIsUserEditing] = useState(false);
  const [selectedCommander, setSeletectedCommander] =
    useState<Commander | null>(games[0]?.commander ?? null);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [openPlayerStatsModal, setOpenPlayerStatsModal] = useState(false);
  const [openCommanderStatsModal, setOpenCommanderStatsModal] = useState(false);

  return (
    <div className="app">
      <section className="recent-games">
        {games.map((game, index) => (
          <GameCard
            key={index.toString()}
            game={game}
            onClick={() => {
              console.log(selectedCommander?.color_identity);

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
          commanderStats={commanderStats}
          onClose={() => setOpenAddGameModal(false)}
          onGameAdded={(game, commanderSats, playerStats) => {
            setGames((prev) => [game, ...prev]);
            setCommanderStats(commanderSats);
            setPlayerStats(playerStats)
          }}
        />
      )}

      {openPlayerStatsModal && (
        <PlayerStatsModal
        playerStats = {playerStats}
        onClose={() => setOpenPlayerStatsModal(false)} />
      )}

      {openCommanderStatsModal && selectedCommander !== null && (
        <CommanderStatsModal
          commander={selectedCommander}
          commanderStats={commanderStats.get(selectedCommander.id)!}
          onClose={() => setOpenCommanderStatsModal(false)}
        />
      )}
    </div>
  );
}

export default App;
