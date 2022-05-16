import clsx from "clsx";
import styles from "./PlayerBoost.module.css";

interface Props {
  boost: number;
  isOrange: boolean;
}

const PlayerBoost = ({ boost, isOrange }: Props) => {
  return (
    <div className={clsx(styles.boost, isOrange ? styles.orange : styles.blue)}>
      <div className={styles.wrapper}>
        <div className={styles.progress} style={{ width: `${boost}%` }} />
      </div>
    </div>
  );
};

export default PlayerBoost;
