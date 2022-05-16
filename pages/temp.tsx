import type { NextPage } from "next";
import "@fontsource/jetbrains-mono"; // Defaults to weight 400.
import "@fontsource/jetbrains-mono/variable.css"; // Contains ONLY variable weights and no other axes.
import GradientComponent from "../components/Gradient";

const Temp: NextPage = () => {
  return (
    <>
      <GradientComponent
        color1="#6a07ff"
        color2="#4407ed"
        color3="#815bc8"
        color4="#6407aa"
      />
    </>
  );
};

export default Temp;
