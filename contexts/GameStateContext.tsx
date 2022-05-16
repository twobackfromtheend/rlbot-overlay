import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameState } from "../models/GameState";
import { Spectate } from "../models/Spectate";
import { useSocketContext } from "./SocketContext";

interface GameStateContextInterface {
  gameState: GameState | null;
  spectate: Spectate | null;
}

const GameStateContext = createContext<GameStateContextInterface | undefined>(
  undefined
);

export const GameStateContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const socket = useSocketContext();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [spectate, setSpectate] = useState<any | null>(null);
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.on("packet", setGameState);
    socket.on("spectate", setSpectate);
    return () => {
      socket.off("packet", setGameState);
      socket.off("spectate", setSpectate);
    };
  });

  console.log(gameState, spectate);

  return (
    <GameStateContext.Provider value={{ gameState, spectate }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error(
      "useGameStateContext must be used within a GameStateContextProvider"
    );
  }
  return context;
};

const y = {
  game_cars: [
    {
      location: {
        x: 1737.52,
        y: 206.22,
        z: 17.01,
      },
      is_demolished: false,
      has_wheel_contact: true,
      is_supersonic: false,
      is_bot: true,
      name: "Necto",
      team: 0,
      boost: 26,
      score_info: {
        score: 0,
        goals: 0,
        own_goals: 0,
        assists: 0,
        saves: 0,
        shots: 0,
        demolitions: 0,
      },
    },
    {
      location: {
        x: 1164.16,
        y: -2237.15,
        z: 95.34,
      },
      is_demolished: false,
      has_wheel_contact: false,
      is_supersonic: false,
      is_bot: true,
      name: "Nexto (v1710)",
      team: 1,
      boost: 0,
      score_info: {
        score: 10,
        goals: 0,
        own_goals: 0,
        assists: 0,
        saves: 0,
        shots: 0,
        demolitions: 0,
      },
    },
  ],
  game_ball: {
    location: {
      x: 730.09,
      y: -3430.18,
      z: 287.38,
    },
    latest_touch: {
      player_name: "Nexto (v1710)",
      time_seconds: 26601.82,
      hit_location: {
        x: -21.32,
        y: 89.3,
        z: 84.47,
      },
      team: 1,
      player_index: 1,
    },
  },
  game_info: {
    seconds_elapsed: 26603.46,
    game_time_remaining: -27582.55,
    is_overtime: false,
    is_unlimited_time: true,
    is_round_active: true,
    is_kickoff_pause: false,
    is_match_ended: false,
    frame_num: 3192415,
  },
  teams: [
    {
      team_index: 0,
      score: 2,
    },
    {
      team_index: 1,
      score: 0,
    },
  ],
};

const x = {
  game_cars: [
    {
      location: {
        x: 1047.67,
        y: -4650.62,
        z: 152.22,
      },
      is_demolished: 0,
      has_wheel_contact: false,
      is_supersonic: 0,
      is_bot: true,
      name: "Necto",
      team: 0,
      boost: 58,
      score_info: {
        score: 0,
        goals: 0,
        own_goals: 0,
        assists: 0,
        saves: 0,
        shots: 0,
        demolitions: 0,
      },
    },
    {
      location: {
        x: 963.19,
        y: -4315.14,
        z: 17.01,
      },
      is_demolished: 0,
      has_wheel_contact: true,
      is_supersonic: 0,
      is_bot: true,
      name: "Nexto (v1710)",
      team: 1,
      boost: 12,
      score_info: {
        score: 16,
        goals: 0,
        own_goals: 0,
        assists: 0,
        saves: 0,
        shots: 1,
        demolitions: 0,
      },
    },
  ],
  game_ball: {
    location: {
      x: 1294.28,
      y: -4520.41,
      z: 790.65,
    },
    latest_touch: {
      player_name: "Nexto (v1710)",
      time_seconds: 26075.35,
      hit_location: {
        x: 728.83,
        y: -479.1,
        z: 93.85,
      },
      team: 1,
      player_index: 1,
    },
  },
  game_info: {
    seconds_elapsed: 26080.24,
    game_time_remaining: -27007.54,
    is_overtime: 0,
    is_unlimited_time: true,
    is_round_active: true,
    is_kickoff_pause: 0,
    is_match_ended: 0,
    frame_num: 3129629,
  },
  teams: [
    {
      team_index: 0,
      score: 1,
    },
    {
      team_index: 1,
      score: 0,
    },
  ],
};
