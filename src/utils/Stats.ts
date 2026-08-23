import { formatRelativeDate, type Commander, type Game } from "./Game";
import { loadGames } from "./LocalStorage";

export type Stats = {
    gamesTotal: number;
    commandersPlayed: number;
    winLossDrawTotal: string;
    winLossDrawRate: [number, number, number];
    performance: number;
    lastPlayed: string;
}

export const loadStats = () => {
    const games: Game[] = loadGames();

    const winLossDrawTotal = calculateWinLossDrawTotal(games);
    const winLossDrawRatio = calculateWinLossDrawRate(winLossDrawTotal)


    const stats: Stats = {
        gamesTotal: games.length,
        commandersPlayed: calculateCommandersPlayed(games),
        winLossDrawTotal: `${winLossDrawTotal[0]}-${winLossDrawTotal[1]}-${winLossDrawTotal[2]}`,
        performance: calculatePerformance(winLossDrawRatio),
        winLossDrawRate: winLossDrawRatio,
        lastPlayed: getMostRecentDate(games)
    };

    return stats;
};

const calculateCommandersPlayed = (games: Game[]): number => {
    const commandersPlayed: Commander[] = [];

    games.forEach((game) => {
        if (
            !commandersPlayed.some((commander) => commander.id === game.commander.id)
        ) {
            commandersPlayed.push(game.commander);
        }
    });

    return commandersPlayed.length;
}

const calculateWinLossDrawTotal = (games: Game[]): [number, number, number] => {
    let [win, loss, draw] = [0, 0, 0];

    games.forEach((game) => {
        if (game.result === "Win") {
            win++;
        }
        else if (game.result === "Draw") {
            draw++;
        }
        else {
            loss++;
        }
    });

    return [win, loss, draw];
}

const calculateWinLossDrawRate = (winLossDrawTotal: [number, number, number]): [number, number, number] => {
    const [win, loss, draw] = winLossDrawTotal;
    const totalGames = win + loss + draw;

    return [win / totalGames, loss / totalGames, draw / totalGames]
}

const calculatePerformance = (winLossDrawRatio: [number, number, number]): number => {

    return (winLossDrawRatio[0] + winLossDrawRatio[2] * 0.5);
}

const getMostRecentDate = (games: Game[]): string => {
    if (games.length === 0) return '';

    return formatRelativeDate(games.reduce((latest, game) =>
        new Date(game.date) > new Date(latest)
            ? game.date
            : latest
        , games[0].date));
};