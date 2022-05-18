import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  //   Title,
  //   Tooltip,
  //   Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  //   CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  //   Title,
  //   Tooltip,
  //   Legend,
  Filler
);
import { useGameStateContext } from "../../contexts/GameStateContext";
import styles from "./Beta.module.css";
import { linspace } from "../../utils/linspace";
import { betaPDF } from "../../utils/beta";
import { betaCDF } from "../../utils/betaCDF";

const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   display: false,
    // },
    // title: {
    //   display: f,
    //   text: "Chart.js Line Chart",
    // },
  },
  scales: {
    x: {
      type: "linear" as const,
      min: 0,
      max: 1,
      display: false,
    },
    y: {
      type: "linear" as const,
      beginAtZero: true,
      display: false,
    },
  },
  layout: {
    padding: 20,
  },
};

const Beta = () => {
  const { gameState } = useGameStateContext();
  if (gameState === null) {
    return null;
  }
  const blueGoals = gameState.teams[0].score;
  const orangeGoals = gameState.teams[1].score;
  //   const blueGoals = 151;
  //   const orangeGoals = 120;
  //   const blueGoals = 5;
  //   const orangeGoals = 1;

  const blueLabels = linspace(0, 0.5, 100);
  const orangeLabels = linspace(0.5, 1, 100);

  const orangeDataset = {
    label: "orange",
    data: orangeLabels.map((x) => ({
      x,
      y: betaPDF(x, orangeGoals + 1, blueGoals + 1),
    })),
    labels: orangeLabels,
    fill: "origin",
    backgroundColor: "#d04a07cc",
    pointRadius: 0,
    cubicInterpolationMode: "default" as const,
    tension: 0.4,
    borderColor: "#ed7a07",
    borderCapStyle: "butt" as const,
    borderWidth: 8,
  };
  const blueDataset = {
    data: blueLabels.map((x) => ({
      x,
      y: betaPDF(x, orangeGoals + 1, blueGoals + 1),
    })),
    labels: blueLabels,
    fill: "origin",
    backgroundColor: "#007be6cc",
    pointRadius: 0,
    cubicInterpolationMode: "default" as const,
    tension: 0.4,
    borderColor: "#5b9eff",
    borderCapStyle: "butt" as const,
    borderWidth: 8,
  };
  const data = {
    datasets:
      orangeGoals > blueGoals
        ? [blueDataset, orangeDataset]
        : [orangeDataset, blueDataset], // Order so smaller dataset is after, to fix stroke going behind fill
  };

  return (
    <div className={styles.beta}>
      <Line options={options} data={data} />
      <div className={styles.text}>
        Prob. blue is better:{" "}
        {(100 - betaCDF(blueGoals + 1, orangeGoals + 1) * 100).toFixed(1)}%
        (!beta)
      </div>
    </div>
  );
};

export default Beta;
