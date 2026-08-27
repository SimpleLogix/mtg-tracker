import { formatToPercent } from "../../utils/Game";

interface WinrateBarProps {
  winrate: [number, number, number]; // win, loss, draw
}

export default function WinrateBar({ winrate }: WinrateBarProps) {
  const [win, loss, draw] = winrate;
  return (
    <div className="winrate-bar-wrapper">
      <div className="winrate-bar">
        <div>
          <div
            className={`${draw === 0 && loss === 0 ? "winrate-bar-last-child" : ""}`}
            style={{ flex: win || 0.0001 }}
          >
            <span>{formatToPercent(win)}</span>
          </div>
          <div
            className={`${draw === 0 ? "winrate-bar-last-child" : win === 0 ? "winrate-bar-first-child" : ""}`}
            style={{ flex: loss || 0.0001 }}
          >
            <span>{formatToPercent(loss)}</span>
          </div>
          <div
            className={`${win === 0 ? "winrate-bar-first-child" : ""}`}
            style={{ flex: draw || 0.0001 }}
          >
            <span>{formatToPercent(draw)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
