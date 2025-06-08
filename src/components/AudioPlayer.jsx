import { useEffect, useRef } from "react";
import { getSecretSongAudio } from "../utils/callApi";
export default function AudioPlayer({ src, isPlaying, timeLimit, onEnd, setIsPlaying }) {
  const audioRef = useRef(null);
  if(!src) return null;
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= timeLimit) {
        audio.pause();
        audio.currentTime = 0;
        if (onEnd) onEnd();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [onEnd, timeLimit]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !src) return;

    if (isPlaying) {
        audio.play().catch((err) => console.error("play error:", err));
    } else {
        audio.pause();
    }
  }, [isPlaying, src]);

    useEffect(() => {
      if (!src) return;

      const fetchAudio = async () => {
        const blob = await getSecretSongAudio(src);  // ya es un Blob directamente
        const url = URL.createObjectURL(blob);
        audioRef.current.src = url;
      };
      
      fetchAudio();
    }, [src]);

  return <audio ref={audioRef} src />;
}
