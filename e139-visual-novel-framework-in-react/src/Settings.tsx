import { FC } from "react";

interface Props {
  volume: number;
  maxVolume: number;
  minVolume: number;
  setVolume: (volume: number) => void;
}

const Settings: FC<Props> = ({ volume, setVolume, minVolume, maxVolume }) => {
  return (
    <div>
      <label htmlFor="volume" style={{ paddingRight: 10 }}>
        Volume
      </label>
      <input
        id="volume"
        type="range"
        min={minVolume}
        max={maxVolume}
        value={volume}
        onChange={(value) => {
          setVolume(value.target.valueAsNumber);
        }}
        step={(maxVolume - minVolume) / 10}
      />
    </div>
  );
};

export default Settings;
