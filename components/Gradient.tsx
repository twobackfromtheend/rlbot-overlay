import { useEffect } from "react";
import { Gradient } from "../utils/gradient";

interface Props {
  id: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

const GradientComponent = (props: Props) => {
  useEffect(() => {
    // Create your instance
    const gradient: any = new Gradient();

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient(`#${props.id}`);
  }, [props.id]);

  return (
    <canvas
      className="blur-[2px]"
      id={props.id}
      data-transition-in
      style={
        {
          width: "100%",
          height: "100%",
          //   "--gradient-color-1": "#c3e4ff",
          //   "--gradient-color-2": "#6ec3f4",
          //   "--gradient-color-3": "#eae2ff",
          //   "--gradient-color-4": "#b9beff",
          "--gradient-color-1": props.color1,
          "--gradient-color-2": props.color2,
          "--gradient-color-3": props.color3,
          "--gradient-color-4": props.color4,
        } as React.CSSProperties
      }
    ></canvas>
  );
};

export default GradientComponent;
