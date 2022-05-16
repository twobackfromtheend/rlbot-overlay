import clsx from "clsx";
import { PlayerInfo } from "../../models/GameState";
import DetailedStats from "./DetailedStats";
import PlayerBoost from "./PlayerBoost";
import styles from "./PlayerStatBox.module.css";

interface Props {
  player: PlayerInfo;
  spectating: boolean;
}

const PlayerStatBox = ({ player, spectating }: Props) => {
  const isOrange = player.team === 1;
  // TODO: See if we can tell if the player is boosting
  return (
    <div
      className={clsx(
        styles.box,
        isOrange ? styles.orange : styles.blue,
        spectating && styles.spectating
      )}
    >
      <div className={styles["player-name-boost"]}>
        <div className="truncate">{player.name}</div>
        <span className={styles.boost}>{player.boost}</span>
      </div>
      <PlayerBoost boost={player.boost} isOrange={isOrange} />
      <DetailedStats player={player} />
    </div>
  );
};

export default PlayerStatBox;
