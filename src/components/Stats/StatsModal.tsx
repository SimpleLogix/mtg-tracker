import Modal from "../AddGameModalScreen/Modal";
import "../../styles/stats.css";
import StatsCard from "./StatsCard";
import { loadStats } from "../../utils/Stats";

interface StatsModalProps {
  onClose: () => void;
}

export default function StatsModal({ onClose }: StatsModalProps) {
  const stats = loadStats();

  return (
    <Modal onClose={onClose}>
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-header-title">General Stats</div>
          <div className="stats-header-subtitle">
            {stats.gamesTotal} Games / {stats.commandersPlayed} Commanders
          </div>
        </div>

        <div className="stats-body">
          <div className="left">
            <StatsCard title="TOTAL GAMES (W-L-D)">
              <div>{stats.winLossDrawTotal}</div>
            </StatsCard>

            <StatsCard title="WIN/LOSS/DRAW RATE">
              <div className="win-loss-draw-wrapper">
                <div className="win-loss-draw-container win">
                  {(stats.winLossDrawRate[0] * 100).toFixed(2)}%
                </div>
                <div className="win-loss-draw-container loss">
                  {" "}
                  {(stats.winLossDrawRate[1] * 100).toFixed(2)}%
                </div>
                <div className="win-loss-draw-container draw">
                  {" "}
                  {(stats.winLossDrawRate[2] * 100).toFixed(2)}%
                </div>
              </div>
            </StatsCard>

            <StatsCard title="CURRENT 21-GAME WINRATE" children={[]} />
            <StatsCard title="GAMES THIS MONTH" children={[]} />
            <div className="win-streak">
              <StatsCard title="CURRENT WIN STREAK" children={[]} />
              <StatsCard title="LONGEST WIN STREAK" children={[]} />
            </div>
          </div>
          <div className="right">
            <StatsCard title="PERFORMANCE">
              <div>{(stats.performance * 100).toFixed(2)}%</div>
            </StatsCard>
            <StatsCard title="LAST PLAYED">
              <div>{stats.lastPlayed}</div>
            </StatsCard>
            <StatsCard title="HIGHEST 21-GAME WINRATE" children={[]} />
            <StatsCard title="GAMES THIS YEAR" children={[]} />
            <StatsCard title="LAST 10 GAMES" children={[]} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
