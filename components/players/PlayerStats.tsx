import clsx from "clsx";
import { useGameStateContext } from "../../contexts/GameStateContext";
import { PlayerInfo } from "../../models/GameState";
import PlayerStatBox from "./PlayerStatBox";
import styles from "./PlayerStats.module.css";

const PlayerStats = () => {
  const { gameState, spectate } = useGameStateContext();
  if (gameState === null) {
    return null;
  }
  const { game_cars, game_info } = gameState;

  // Collate players by team and sort to ensure order persists.
  const bluePlayers: PlayerInfo[] = [];
  const orangePlayers: PlayerInfo[] = [];
  Object.values(game_cars).forEach((playerInfo) => {
    if (playerInfo.team === 1) {
      orangePlayers.push(playerInfo);
    } else {
      bluePlayers.push(playerInfo);
    }
  });

  bluePlayers.sort(playerCompareFn);
  orangePlayers.sort(playerCompareFn);

  return (
    <div
      className={clsx(
        "duration-300",
        game_info.is_round_active ? "opacity-100" : "opacity-0"
      )}
    >
      <div className={clsx(styles.team, styles.blue)}>
        {bluePlayers.map((player) => (
          <PlayerStatBox
            key={player.name}
            player={player}
            spectating={spectate?.player.name === player.name}
          />
        ))}
      </div>
      <div className={clsx(styles.team, styles.orange)}>
        {orangePlayers.map((player) => (
          <PlayerStatBox
            key={player.name}
            player={player}
            spectating={spectate?.player.name === player.name}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;

// Sort player by name
const playerCompareFn = (playerA: PlayerInfo, playerB: PlayerInfo): number => {
  return playerA.name.localeCompare(playerB.name);
};
