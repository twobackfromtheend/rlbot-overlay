import styles from "./BoostCircle.module.css";

interface Props {
  amount: number;
  radius: number;
  stroke: number;
}

const BoostCircle = ({ amount, radius, stroke }: Props) => {
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - ((0.75 * amount) / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        className={styles.circle}
        stroke="#6407aa33"
        // fill="#0006"
        fill="transparent"
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className={styles.circle}
        stroke="#6407aa"
        fill="transparent"
        stroke-width={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default BoostCircle;
