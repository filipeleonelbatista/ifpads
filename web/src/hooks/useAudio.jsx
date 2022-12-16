import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

export function useAudio() {
  const value = useContext(AudioContext);
  return value;
}
