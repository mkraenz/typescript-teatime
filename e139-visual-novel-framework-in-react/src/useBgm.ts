import { useRef, useState } from "react";

const maxVolume = 10;
const minVolume = 0;

const useBgm = () => {
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(maxVolume / 2);
  const playBgm = (src: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = src;
      audioPlayerRef.current.volume = volume / (maxVolume - minVolume);
      audioPlayerRef.current?.play();
    }
  };
  const pauseBgm = () => audioPlayerRef.current?.pause();
  const changeVolume = (volume: number) => {
    setVolume(volume);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = volume / (maxVolume - minVolume);
    }
  };

  return {
    audioPlayerRef,
    playBgm,
    pauseBgm,
    changeVolume,
    volume,
    maxVolume,
    minVolume,
  };
};

export default useBgm;
