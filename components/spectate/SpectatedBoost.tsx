import { PlayerInfo } from "../../models/GameState";
import GradientComponent from "../Gradient";
import BoostCircle from "./BoostCircle";
import styles from "./SpectatedBoost.module.css";

interface Props {
  player: PlayerInfo;
}

const SpectatedBoost = ({ player }: Props) => {
  const radius = 80;
  const stroke = 12;
  return (
    <div className={styles.boost}>
      <div className={styles.center}>
        <div
          className="relative overflow-hidden rounded-full opacity-50"
          style={{
            width: radius * 2 - stroke * 2 - stroke,
            height: radius * 2 - stroke * 2 - stroke,
          }}
        >
          <GradientComponent
            id="boost-gradient"
            color1="#9562ed"
            color2="#4c01f2"
            color3="#771c9f"
            color4="#550777"
          />
        </div>
      </div>
      <div className={styles.center}>
        <BoostCircle
          key={radius}
          amount={player.boost}
          radius={radius}
          stroke={stroke}
        />
      </div>
      <div className={styles.center}>
        <div className={styles.text}>{player.boost}</div>
      </div>
    </div>
  );
};

export default SpectatedBoost;