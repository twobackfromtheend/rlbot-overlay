import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import GameBackground from "../assets/game-background.webp";
import clsx from "clsx";
import ScoreBug from "../components/ScoreBug";
import "@fontsource/jetbrains-mono"; // Defaults to weight 400.
import "@fontsource/jetbrains-mono/variable.css"; // Contains ONLY variable weights and no other axes.
import { GameStateContextProvider } from "../contexts/GameStateContext";
import PlayerStats from "../components/players/PlayerStats";
import { SocketContextProvider } from "../contexts/SocketContext";
import { useData } from "../services/sheets";
import Debug from "../components/debug/Debug";
import SpectatedPlayer from "../components/spectate/SpectatedPlayer";

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

  const data = useData();
  console.log(data);
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
          </GameStateContextProvider>
        </SocketContextProvider>
        {/* <ScoreBug />
      <PlayerStats />
      <StatEvents />
      <Minimap />
      <BottomBar infoView={infoView} setInfoView={setInfoView} />
      {infoView && <DebugInfo />} */}
      </div>
    </main>
  );
};

export default Home;
