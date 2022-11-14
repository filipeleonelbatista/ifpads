import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

export function useAudioContext() {
  const value = useContext(AudioContext);
  return value;
}
