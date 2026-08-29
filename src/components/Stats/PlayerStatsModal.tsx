import Modal from "../AddGameModalScreen/Modal";
import "../../styles/stats.css";
import StatsCard from "./PlayerStatsCard";
import Last10Games from "./LastTenGames";
import { formatToPercent } from "../../utils/Game";
import type { PlayerStats } from "../../utils/Stats";

interface PlayerStatsModalProps {
  onClose: () => void;
  playerStats: PlayerStats;
}

export default function PlayerStatsModal({
  onClose,
  playerStats,
}: PlayerStatsModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-header-title">General Stats</div>
          <div className="stats-header-subtitle">
            {playerStats.gamesTotal} Games / {playerStats.commandersPlayed}{" "}
            Commanders
          </div>
        </div>

        <div className="stats-body">
          <div className="left">
            <StatsCard title="TOTAL GAMES (W-L-D)">
              <div>{playerStats.winLossDrawTotal}</div>
            </StatsCard>

            <StatsCard title="WIN/LOSS/DRAW RATE">
              <div className="win-loss-draw-wrapper">
                <div className="win-loss-draw-container win">
                  {formatToPercent(playerStats.winLossDrawRate[0])}
                </div>
                <div className="win-loss-draw-container loss">
                  {formatToPercent(playerStats.winLossDrawRate[1])}
                </div>
                <div className="win-loss-draw-container draw">
                  {formatToPercent(playerStats.winLossDrawRate[2])}
                </div>
              </div>
            </StatsCard>

            <StatsCard title="CURRENT 21-GAME WINRATE">
              {formatToPercent(playerStats.current21GameWinrate)}
            </StatsCard>
            <StatsCard title="GAMES THIS MONTH">
              {playerStats.gamesThisMonth}
            </StatsCard>
            <div className="win-streak">
              <StatsCard title="CURRENT WIN STREAK">
                {playerStats.currentWinstreak}
              </StatsCard>
              <StatsCard title="LONGEST WIN STREAK">
                {playerStats.longestWinstreak}
              </StatsCard>
            </div>
          </div>
          <div className="right">
            <StatsCard title="PERFORMANCE">
              <div className="stats-performance-card">
                {formatToPercent(playerStats.performance)}

                {playerStats.performance >= playerStats.lastPerformance ? (
                  <span className="material-symbols-outlined delta-up">
                    Arrow_Drop_Up
                  </span>
                ) : (
                  <span className="material-symbols-outlined delta-down">
                    Arrow_Drop_Down
                  </span>
                )}
              </div>
            </StatsCard>
            <StatsCard title="LAST PLAYED">
              <div>{playerStats.lastPlayed}</div>
            </StatsCard>
            <StatsCard title="HIGHEST 21-GAME WINRATE">
              {formatToPercent(playerStats.current21GameWinrate)}
            </StatsCard>
            <StatsCard title="GAMES THIS YEAR">
              {playerStats.gamesThisYear}
            </StatsCard>
            <StatsCard title="LAST 10 GAMES">
              <Last10Games gameResults={playerStats.lastTenGames} />
            </StatsCard>
          </div>
        </div>
      </div>
    </Modal>
  );
}
