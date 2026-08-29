export type GameResult = "Loss" | "Draw" | "Win";

export interface Commander {
  id: string;
  name: string;
  img_url: string | undefined;
  color_identity: string[];
}


export interface Game {
  id: string,
  commander: Commander;
  result: GameResult;
  date: string;
  commanderRecord: string;
}

// helper function to conver decimal to string percent
export function formatToPercent(num: number): string {
  return parseFloat((num * 100).toFixed(1)) + '%'
}

// helper function to format string date to 
export function formatRelativeDate(date: string): string {
  const now = new Date();
  const past = new Date(date);

  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays < 7) {
    return "This week";
  }

  if (diffDays < 14) {
    return "1 week ago";
  }

  if (diffDays < 21) {
    return "2 weeks ago";
  }

  if (diffDays < 28) {
    return "3 weeks ago";
  }

  const months = Math.floor(diffDays / 30);

  if (months <= 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} year${years === 1 ? "" : "s"} ago`;
}