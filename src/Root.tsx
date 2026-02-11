import "./index.css";
import { Composition } from "remotion";
import { GoogleIOIntro } from "./Intro/GoogleIOIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GoogleIOIntro"
        component={GoogleIOIntro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
