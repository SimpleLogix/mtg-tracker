import type { Commander, Game } from "./Game";

// Save, Load, Remove Commanders
export function loadCommanders(): Commander[] {
    const saved = localStorage.getItem("commanders");

    return saved ? JSON.parse(saved) : [];
}

export
    function addCommander(commander: Commander) {
    const saved = localStorage.getItem("commanders");
    const commanders: Commander[] = saved ? JSON.parse(saved) : [];

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

    return saved ? JSON.parse(saved) : [];
}

export function saveGame(game: Game) {

    const games = loadGames();

    games.unshift(game);
    localStorage.setItem("games", JSON.stringify(games));
}

export function clearGames() {
    localStorage.setItem("games", "")
}

export function removeGame(game: Game) {

    const games = loadGames();

    const updatedGames = games.filter((g) => g.id !== game.id);

    localStorage.setItem("games", JSON.stringify(updatedGames));

}