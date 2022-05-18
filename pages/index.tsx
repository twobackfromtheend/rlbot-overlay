import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import GameBackground from "../assets/game-background.webp";
import clsx from "clsx";
import ScoreBug from "../components/ScoreBug";
import "@fontsource/jetbrains-mono/variable.css"; // Contains ONLY variable weights and no other axes.
import { GameStateContextProvider } from "../contexts/GameStateContext";
import PlayerStats from "../components/players/PlayerStats";
import { SocketContextProvider } from "../contexts/SocketContext";
import Debug from "../components/debug/Debug";
import SpectatedPlayer from "../components/spectate/SpectatedPlayer";
import Beta from "../components/beta/Beta";

const Home: NextPage = () => {
  const [infoView, setInfoView] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  useEffect(() => {
    document.body.addEventListener(
      "mouseover",
      () => {
        if (!mouseEntered) {
          setMouseEntered(true);
          setInfoView(true);
        }
      },
      { once: true }
    );
  }, [mouseEntered]);

  return (
    <main className="flex h-0 min-h-screen items-center justify-center">
      <div className={clsx(styles.overlay, infoView && styles["info-view"])}>
        {infoView && (
          <div className="relative h-full w-full">
            <Image
              src={GameBackground}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <SocketContextProvider>
          <GameStateContextProvider>
            {infoView && <Debug />}
            <ScoreBug />
            <PlayerStats />
            <SpectatedPlayer />
            <Beta />
          </GameStateContextProvider>
        </SocketContextProvider>
      </div>
    </main>
  );
};

export default Home;
