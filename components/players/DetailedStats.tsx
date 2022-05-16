import { SVGProps } from "react";
import { PlayerInfo } from "../../models/GameState";
import Assist from "../icons/Assist";
import Goal from "../icons/Goal";
import Save from "../icons/Save";
import Shot from "../icons/Shot";
import UltraDamage from "../icons/UltraDamage";
import styles from "./DetailedStats.module.css";

interface Props {
  player: PlayerInfo;
}

const DetailedStats = ({ player }: Props) => {
  return (
    <div className={styles.stats}>
      <Stat Icon={UltraDamage} value={player.score_info.score} />
      <Stat Icon={Goal} value={player.score_info.goals} />
      <Stat Icon={Assist} value={player.score_info.assists} />
      <Stat Icon={Save} value={player.score_info.saves} />
      <Stat Icon={Shot} value={player.score_info.shots} />
    </div>
  );
};

export default DetailedStats;

interface StatProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  value: React.ReactNode;
}

const Stat = ({ Icon, value }: StatProps) => {
  return (
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4 shrink-0" />
      {value}
    </div>
  );
};
