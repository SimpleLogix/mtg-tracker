import type { Commander, Game } from "./Game";
import { EMPTY_PLAYERSTATS, type CommanderStats, type PlayerStats } from "./Stats";

// Save, Load, Remove Commanders
export function loadCommanders(): Commander[] {
    const saved = localStorage.getItem("commanders");

    return saved ? JSON.parse(saved) : [];
}

export
    function addCommander(commander: Commander) {
    const saved = localStorage.getItem("commanders");
    const commanders: Commander[] = saved ? JSON.parse(saved) : [];
    console.log(commander)
    if (commanders.some((c) => c.id === commander.id)) {
        return;
    }

    commanders.unshift(commander);
    localStorage.setItem("commanders", JSON.stringify(commanders));
}

export function removeCommander(commander: Commander) {
    const saved = localStorage.getItem("commanders");
    const commanders: Commander[] = saved ? JSON.parse(saved) : [];

    const updated = commanders.filter((c) => c.id !== commander.id);

    localStorage.setItem("commanders", JSON.stringify(updated));
}






// Save and load Games
export function loadGames(): Game[] {
    const saved = localStorage.getItem("games");

    console.log("~games loaded~")

    return saved ? JSON.parse(saved) : [];

}

export function saveGame(game: Game) {

    const games = loadGames();

    games.unshift(game);
    localStorage.setItem("games", JSON.stringify(games));

    return games;

}

export function removeGame(game: Game) {

    const games = loadGames();

    const updatedGames = games.filter((g) => g.id !== game.id);

    localStorage.setItem("games", JSON.stringify(updatedGames));

}




export function saveCommanderStats(commanderStats: Map<string, CommanderStats>) {
    localStorage.setItem(
        "commanderStats",
        JSON.stringify(Array.from(commanderStats.entries()))
    );
}

export const loadCommanderStats = (): Map<string, CommanderStats> => {
    const stored = localStorage.getItem("commanderStats");

    const commanderStats = stored
        ? new Map<string, CommanderStats>(JSON.parse(stored))
        : new Map<string, CommanderStats>();

    return commanderStats;
}



export function savePlayerStats(playerStats: PlayerStats) {
    localStorage.setItem(
        "playerStats",
        JSON.stringify(playerStats)
    );
}

export function loadPlayerStats() {
    const stored = localStorage.getItem("playerStats");

    const stats: PlayerStats = stored ? JSON.parse(stored) : EMPTY_PLAYERSTATS;

    return stats;
}




export function clearGames() {
    localStorage.removeItem("games")
}

export function clearCommanders() {
    localStorage.removeItem("commanders")
}

export function clearStats() {
    localStorage.removeItem("playerStats")
    localStorage.removeItem("commanderStats")
}