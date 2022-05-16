import clsx from "clsx";
import { useGameStateContext } from "../../contexts/GameStateContext";
import { PlayerInfo } from "../../models/GameState";
import SpectatedBoost from "./SpectatedBoost";

const SpectatedPlayer = () => {
  const { gameState, spectate } = useGameStateContext();

  if (gameState === null || spectate === null) {
    return null;
  }

  const { game_cars, game_info } = gameState;
  const spectatedPlayer: PlayerInfo | null =
    game_cars.find((player) => spectate.player.name === player.name) || null;
  if (spectatedPlayer === null) {
    console.log(
      `Could not find spectated player ${spectate.player.name} among players`
    );
    return null;
  }

  return (
    <div
      className={clsx(
        "duration-300",
        game_info.is_round_active ? "opacity-100" : "opacity-0"
      )}
    >
      <SpectatedBoost player={spectatedPlayer} />
    </div>
  );
};

export default SpectatedPlayer;
