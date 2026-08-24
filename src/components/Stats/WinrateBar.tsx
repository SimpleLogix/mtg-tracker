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
          <div style={{ width: formatToPercent(win) }}>
            <span>{formatToPercent(win)}</span>
          </div>
          <div style={{ width: formatToPercent(loss) }}>
            <span>{formatToPercent(loss)}</span>
          </div>
          <div style={{ width: formatToPercent(draw) }}>
            <span>{formatToPercent(draw)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
