import { formatRelativeDate, type Commander, type Game, type GameResult } from "./Game";
import { loadGames } from "./LocalStorage";

export type Stats = {
    gamesTotal: number;
    commandersPlayed: number;
    winLossDrawTotal: string;
    winLossDrawRate: [number, number, number];
    performance: number;
    lastPlayed: string;
    current21GameWinrate: number;
    highest21GameWinrate: number;
    gamesThisMonth: number;
    gamesThisYear: number;
    currentWinstreak: number;
    longestWinstreak: number;
    lastTenGames: GameResult[];
}

export const loadStats = () => {
    const games: Game[] = loadGames();

    const winLossDrawTotal = calculateWinLossDrawTotal(games);
    const winLossDrawRatio = calculateWinLossDrawRate(winLossDrawTotal)
    const gamesThisMonthAndYear = calculateGamesThisMonthAndYear(games)
    const winStreaks = calculateWinStreaks(games);


    const stats: Stats = {
        gamesTotal: games.length,
        commandersPlayed: calculateCommandersPlayed(games),
        winLossDrawTotal: `${winLossDrawTotal[0]}-${winLossDrawTotal[1]}-${winLossDrawTotal[2]}`,
        performance: calculatePerformance(winLossDrawRatio),
        winLossDrawRate: winLossDrawRatio,
        lastPlayed: getMostRecentDate(games),
        current21GameWinrate: calculateCurrent21GameWinrate(games),
        highest21GameWinrate: calculateHighest21GameWinrate(games),
        gamesThisMonth: gamesThisMonthAndYear[0],
        gamesThisYear: gamesThisMonthAndYear[1],
        currentWinstreak: winStreaks[0],
        longestWinstreak: winStreaks[1],
        lastTenGames: calculateLast10Games(games),
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

const calculateCurrent21GameWinrate = (games: Game[]): number => {
    const first21Games = games.slice(0, 21);
    if (first21Games.length === 0) {
        return 0;
    }

    const wins = first21Games.filter(game => game.result === "Win").length;
    return wins / first21Games.length;
}

const calculateHighest21GameWinrate = (games: Game[]): number => {
    if (games.length === 0) return 0;

    const windowSize = Math.min(21, games.length);

    let wins = 0;
    for (let i = 0; i < windowSize; i++) {
        if (games[i].result === "Win") {
            wins++;
        }
    }

    let highestWinrate = wins / windowSize;

    for (let i = windowSize; i < games.length; i++) {
        if (games[i - windowSize].result === "Win") {
            wins--;
        }
        if (games[i].result === "Win") {
            wins++;
        }
        highestWinrate = Math.max(highestWinrate, wins / windowSize);
    }

    return highestWinrate;
};

// [month, year]
const calculateGamesThisMonthAndYear = (games: Game[]): [number, number] => {
    const now = new Date();
    let gamesThisMonth = 0;
    let gamesThisYear = 0;

    for (const game of games) {
        const past = new Date(game.date);
        const diffMs = now.getTime() - past.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays < 28) {
            gamesThisMonth++;
            gamesThisYear++;
        } else if (diffDays < 365) {
            gamesThisYear++;
        }
        else {
            break;
        }
    }

    return [gamesThisMonth, gamesThisYear];
};

// [currentWinstreak, longestWinstreak]
const calculateWinStreaks = (games: Game[]): [number, number] => {
    let currentWinstreak = 0;
    let longestWinstreak = 0;
    let flag = true;
    let streak = 0;

    games.forEach((game) => {
        if (game.result === "Win") {
            streak++;

            if (flag) {
                currentWinstreak++;
            }
        } else {
            flag = false;

            longestWinstreak = Math.max(longestWinstreak, streak);
            streak = 0;
        }
    });

    longestWinstreak = Math.max(longestWinstreak, streak);

    return [currentWinstreak, longestWinstreak];
};

const calculateLast10Games = (games: Game[]): GameResult[] => {

    const last10Games = games.slice(0, 10);

    return last10Games.map(game => game.result);
}