import { useEffect, useRef, useState } from "react";
import { getSecretSongAudio } from "../utils/callApi";

export default function AudioPlayer({ src, isPlaying, timeLimit, onEnd, setIsPlaying }) {
    const audioRef = useRef(null);
    const [ready, setReady] = useState(false);

    // Load audio blob whenever src (secretId) changes
    useEffect(() => {
        if (!src) return;
        setReady(false);

        const fetchAudio = async () => {
            try {
                const blob = await getSecretSongAudio(src);
                if (!blob || !audioRef.current) return;
                const url = URL.createObjectURL(blob);
                audioRef.current.src = url;
                setReady(true);
            } catch (err) {
                console.error("Error loading audio:", err);
            }
        };

        fetchAudio();

        // Cleanup: stop and clear audio when src changes or component unmounts
        return () => {
            const audio = audioRef.current;
            if (audio) {
                audio.pause();
                audio.src = "";
                audio.load();
            }
        };
    }, [src]);

    // Enforce time limit
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.35;

        const handleTimeUpdate = () => {
            if (audio.currentTime >= timeLimit) {
                audio.pause();
                audio.currentTime = 0;
                if (onEnd) onEnd();
            }
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }, [timeLimit, onEnd]);

    // Play / pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !ready) return;

        if (isPlaying) {
            audio.play().catch((err) => console.error("play error:", err));
        } else {
            audio.pause();
        }
    }, [isPlaying, ready]);

    if (!src) return null;

    return <audio ref={audioRef} />;
}
