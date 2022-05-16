import clsx from "clsx";
import { useGameStateContext } from "../contexts/GameStateContext";
import { useData } from "../services/sheets";
import GradientComponent from "./Gradient";
import styles from "./ScoreBug.module.css";

const ScoreBug = () => {
  const { gameState } = useGameStateContext();
  const { data } = useData();

  if (gameState === null) {
    return null;
  }
  const { game_info, teams } = gameState;
  const matchEnded = game_info.is_match_ended;

  const blueScore = teams[0].score;
  const orangeScore = teams[1].score;
  const isOvertime = game_info.is_overtime;
  const displayedSeconds = getDisplayedSeconds(
    game_info.game_time_remaining,
    game_info.is_overtime,
    game_info.is_unlimited_time
  );

  // Find names from sheet data, falling back to first car with that name,
  const blueName =
    data.blueName ||
    gameState.game_cars.find((player) => player.team === 0)?.name ||
    "Blue";
  const orangeName =
    data.orangeName ||
    gameState.game_cars.find((player) => player.team === 1)?.name ||
    "Orange";
  const blueFlavourText = data.blueFlavourText;
  const orangeFlavourText = data.orangeFlavourText;

  return (
    <div
      className={clsx(
        styles["score-bug"],
        matchEnded ? "opacity-0" : "opacity-100"
      )}
    >
      <div className={clsx(styles.team, styles.blue)}>
        <div className="!absolute inset-x-0 inset-y-1.5 overflow-hidden rounded-sm opacity-50">
          <GradientComponent
            id="blue-gradient"
            color1="#8abfff"
            color2="#5b9eff"
            color3="#815bc8"
            color4="#6407aa"
          />
        </div>
        <div className={styles.name}>{blueName}</div>
        <div className="h-0 whitespace-nowrap opacity-0">{orangeName}</div>
        <div
          className="absolute inset-x-0 bottom-0 h-0 "
          style={{ boxShadow: "0 0 20px 3px #5a28b7aa" }}
        />
        <div className={styles.flavour}>{blueFlavourText}</div>
      </div>
      <div>
        <div className={clsx(styles.score, styles.blue)}>
          <div className={styles.tail} />
          {blueScore}
        </div>
        {/* Render orange score here too but hidden so widths are shared*/}
        <div
          className={clsx(styles.score, styles.orange, "-mt-12 h-0 opacity-0")}
        >
          {orangeScore}
        </div>
      </div>
      <div className={styles.timer}>
        <div className="!absolute -inset-x-4 -top-1 -bottom-1 overflow-hidden rounded-b-[100%] bg-purple-800" />
        <div className="!absolute -inset-x-4 -top-1 -bottom-1 overflow-hidden rounded-b-[100%] opacity-50">
          <GradientComponent
            id="timer-gradient"
            color1="#9562ed"
            color2="#4c01f2"
            color3="#771c9f"
            color4="#550777"
          />
        </div>
        <span className={styles.clock}>
          {getTimerString(displayedSeconds || 0, isOvertime || false)}
        </span>
        {isOvertime && <div className={styles.overtime}>overtime</div>}
      </div>
      <div>
        <div className={clsx(styles.score, styles.orange)}>
          {orangeScore}
          <div className={styles.tail} />
        </div>
        {/* Render blue score here too but hidden so widths are shared*/}
        <div
          className={clsx(styles.score, styles.blue, "-mt-12 h-0 opacity-0")}
        >
          {blueScore}
        </div>
      </div>
      <div className={clsx(styles.team, styles.orange)}>
        <div className="!absolute inset-x-0 inset-y-1.5 overflow-hidden rounded-sm opacity-50">
          <GradientComponent
            id="orange-gradient"
            color1="#ffa407"
            color2="#ed7a07"
            color3="#815bc8"
            color4="#6407aa"
          />
        </div>
        <div className={styles.name}>{orangeName}</div>
        <div className="h-0 whitespace-nowrap opacity-0">{blueName}</div>
        <div
          className="absolute inset-x-0 bottom-0 h-0 "
          style={{ boxShadow: "0 0 20px 3px #5a28b7aa" }}
        />
        <div className={styles.flavour}>{orangeFlavourText}</div>
      </div>
    </div>
  );
};

const getDisplayedSeconds = (
  timeRemaining: number,
  isOvertime: boolean,
  isUnlimitedTime: boolean
): number => {
  let displayedSeconds: number = Math.ceil(timeRemaining);
  if (isOvertime) {
    displayedSeconds *= -1;
  }
  if (isUnlimitedTime) {
    displayedSeconds *= -1;
  }
  return displayedSeconds;
};

const getTimerString = (displayedSeconds: number, isOvertime: boolean) => {
  return (
    <span>
      {isOvertime && <span className="mr-2">+</span>}
      <span>
        {Math.floor(displayedSeconds / 60)}:
        {Math.round(displayedSeconds % 60)
          .toString()
          .padStart(2, "0")}
      </span>
    </span>
  );
};

export default ScoreBug;

// game_time_remaining: 299.96 when 5:00
// game_time_remaining: 241.16 when 4:02
// game_time_remaining: -2.91 overtime when +0:00
// game_time_remaining: -4.12 overtime when +0:04
// game_time_remaining: -7.59 overtime when +0:07
// game_time_remaining: -1.82 unlimited time when +0:01
