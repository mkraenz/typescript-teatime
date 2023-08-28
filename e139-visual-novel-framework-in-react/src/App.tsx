import { useState } from "react";
import { Shaking } from "reshake";
import { ShakeTypes } from "reshake/dist/types/shakes";
import "./App.css";
import Page from "./Page";
import Settings from "./Settings";
import { data } from "./data";
import useBgm from "./useBgm";

const App = () => {
  const [page, setPage] = useState("init");
  const {
    audioPlayerRef,
    playBgm,
    changeVolume,
    volume,
    minVolume,
    maxVolume,
    pauseBgm,
  } = useBgm();
  const [shakeOptions, setShakeOptions] = useState<{
    type: ShakeTypes;
    active: boolean;
    iterations: number;
    r?: number;
  }>({
    active: false,
    iterations: 10,
    type: "little",
    r: undefined,
  });

  return (
    <>
      <Shaking
        type={shakeOptions.type}
        q={shakeOptions.iterations}
        active={shakeOptions.active}
        fixed
        r={shakeOptions.r}
      >
        <Page
          data={data[page as keyof typeof data]}
          nextPage={setPage}
          serviceLocator={{
            audio: { playBgm, pauseBgm },
            screenShake: {
              shake: (type) =>
                setShakeOptions((prev) => ({ ...prev, active: true, type })),
              stop: () =>
                setShakeOptions((prev) => ({ ...prev, active: false, r: 0 })),
            },
          }}
        />
      </Shaking>
      <audio ref={audioPlayerRef} src="/Battle.mp3" loop />
      <Settings
        volume={volume}
        maxVolume={maxVolume}
        minVolume={minVolume}
        setVolume={changeVolume}
      />
    </>
  );
};

export default App;
