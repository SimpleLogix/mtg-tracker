import Modal from "../AddGameModalScreen/Modal";
import "../../styles/stats.css";
import { formatToPercent, type Commander } from "../../utils/Game";
import WinrateBar from "./WinrateBar";
import Last10Games from "./LastTenGames";
import CommanderStatsCard from "./CommanderStatsCard";
import type { CommanderStats } from "../../utils/Stats";

interface CommanderStatsModalProps {
  onClose: () => void;
  commander: Commander;
  commanderStats: CommanderStats;
}

export default function CommanderStatsModal({
  onClose,
  commander,
  commanderStats,
}: CommanderStatsModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="commander-stats-container">
        <div className="commander-stats-header">
          <div className="commander-stats-portrait">
            <div>
              <div style={{ backgroundImage: `url(${commander.img_url})` }} />
            </div>
          </div>
          <div className="commander-stats-name">{commander.name}</div>
        </div>

        <WinrateBar winrate={commanderStats.winLossDrawTotal} />

        <div className="commander-stats-body">
          <div>
            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Total Record">
                <span>
                  {commanderStats.winLossDrawTotal[0] +
                    "-" +
                    commanderStats.winLossDrawTotal[1] +
                    "-" +
                    commanderStats.winLossDrawTotal[2]}
                </span>
              </CommanderStatsCard>
            </div>

            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Performance">
                <span className="material-symbols-outlined delta-up">
                  Arrow_Drop_Up
                </span>

                <span>{formatToPercent(commanderStats.performance)}</span>
              </CommanderStatsCard>
            </div>

            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Total Games">
                <span>{commanderStats.gamesTotal}</span>
              </CommanderStatsCard>
            </div>
          </div>

          <div>
            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Games This Month">
                <span>{commanderStats.gamesThisMonth}</span>
              </CommanderStatsCard>
            </div>
            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Current Streak">
                <span>{commanderStats.currentStreak}</span>
              </CommanderStatsCard>
            </div>
            <div>
              <div className="vertical-tick"></div>
              <CommanderStatsCard title="Longest Streak">
                <span>{commanderStats.longestStreak}</span>
              </CommanderStatsCard>
            </div>
          </div>
        </div>

        <div className="commander-stats-last-ten">
          <CommanderStatsCard title="Last 10 Games">
            <Last10Games gameResults={commanderStats.lastTenGames} />
          </CommanderStatsCard>
        </div>
      </div>
    </Modal>
  );
}
