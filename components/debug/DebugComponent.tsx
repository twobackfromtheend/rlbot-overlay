import { useGameStateContext } from "../../contexts/GameStateContext";
import ReactJson from "react-json-view";

const DebugComponent = () => {
  const { gameState, spectate } = useGameStateContext();
  return (
    <div className="fixed inset-y-0 z-[100] m-auto max-h-[50vh] w-[880px] overflow-auto rounded bg-white/95 shadow-lg">
      <div className="grid grid-cols-2 gap-8 rounded px-8 py-4">
        <div>
          <div className="my-4 font-bold text-black">Game State</div>
          {gameState ? (
            <ReactJson
              src={gameState}
              iconStyle="square"
              theme="summerfruit:inverted"
              style={{
                backgroundColor: "transparent",
                overflow: "hidden",
              }}
              indentWidth={2}
              collapsed={2}
              sortKeys
            />
          ) : (
            <span className="text-gray-400">null</span>
          )}
        </div>
        <div>
          <div className="my-2 font-bold text-black">Spectate</div>
          {spectate ? (
            <ReactJson
              src={spectate}
              iconStyle="square"
              theme="summerfruit:inverted"
              style={{
                backgroundColor: "transparent",
                overflow: "hidden",
              }}
              indentWidth={2}
              collapsed={2}
              sortKeys
            />
          ) : (
            <span className="text-gray-400">null</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugComponent;
