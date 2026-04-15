import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { getSongs, getAlbumTracks, getArtist, getSecretSong } from "../utils/callApi";
import { FaPlay, FaPause } from "react-icons/fa";
import AudioPlayer from "../components/AudioPlayer";
import { ScaleLoader } from "react-spinners";
import './../index.css';
import GameCompleteModal from "../components/GameCompleteModal";

export default function GameScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [secretSong, setSecretSong] = useState(null);
    const [guessInputs, setGuessInputs] = useState(
        Array.from({ length: 5 }, (_, i) => ({
            value: "",
            color: "",
            disabled: i !== 0,
        }))
    );
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const [isWinner, setIsWinner] = useState(false);
    const [secretSongAudio, setSecretSongAudio] = useState(null);
    const audioRef = useRef(null);

    const resetGame = async () => {
        // Immediately clear audio so old AudioPlayer unmounts — prevents old song bleeding into new round
        setSecretSongAudio(null);
        setSecretSong(null);
        setIsPlaying(false);

        setGuessInputs(
            Array.from({ length: 5 }, (_, i) => ({
                value: "",
                color: "",
                disabled: i !== 0,
            }))
        );
        setActiveInputIndex(0);
        setGameOver(false);
        setIsWinner(false);

        const newSecretSong = await getSecretSong(id);
        if (newSecretSong) {
            setSecretSong(newSecretSong.song);
            setSecretSongAudio(newSecretSong?.secretId);
        }
    };

    const componentDidMount = async () => {
        setIsLoading(true);
        const artist = await getArtist(id);
        setArtist(artist);
        const data = await getSongs(id);
        setSongs(data);

        if (data.length > 0) {
            const secretSong = await getSecretSong(id);
            if (secretSong) {
                setSecretSong(secretSong.song);
                setSecretSongAudio(secretSong?.secretId);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        componentDidMount();
    }, [id]);

    const filteredSuggestions = useMemo(() => {
        const current = guessInputs[activeInputIndex]?.value || "";
        if (!current.trim()) return [];
        return songs?.filter(song =>
            song.name.toLowerCase().includes(current.toLowerCase())
        );
    }, [guessInputs, activeInputIndex, songs]);

    const handleGuess = (guessName) => {
        const guessSong = songs.find(song => song.name.toLowerCase() === guessName.toLowerCase());
        if (!guessSong) return;

        let color = "red";
        if (guessSong.id === secretSong.id) {
            color = "green";
            setGameOver(true);
            setIsPlaying(true);
            setIsWinner(true);
        } else if (guessSong.album === secretSong.album) {
            color = "yellow";
        }

        const updatedInputs = [...guessInputs];
        updatedInputs[activeInputIndex] = {
            value: guessSong.name,
            color,
            disabled: true,
        };

        if (color !== "green" && activeInputIndex < 4) {
            updatedInputs[activeInputIndex + 1].disabled = false;
        }

        setGuessInputs(updatedInputs);

        if (color !== "green" && activeInputIndex < 5) {
            setActiveInputIndex(prev => prev + 1);
        }
    };

    const handleInputChange = (index, value) => {
        const updatedInputs = [...guessInputs];
        updatedInputs[index].value = value;
        setGuessInputs(updatedInputs);
    };

    const handleKeyDown = (e, value) => {
        if (e.key === "Enter") {
            if (filteredSuggestions?.length > 0) {
                const firstSuggestion = filteredSuggestions[0];
                handleInputChange(activeInputIndex, firstSuggestion.name);
                handleGuess(firstSuggestion.name);
            } else {
                handleGuess(value);
            }
        }
    };

    useEffect(() => {
        if (activeInputIndex === 5 && gameOver === false) {
            setGameOver(true);
        }
    }, [activeInputIndex]);

    useEffect(() => {
        if (gameOver) {
            // setIsPlaying(true);
        }
    }, [gameOver]);

    if (isLoading) return (
        <section className="flex items-center justify-center h-screen w-full background">
            <ScaleLoader color={"#1db954"} />
        </section>
    );

    return (
        <Layout>
            <GameCompleteModal
                isVisible={gameOver}
                onBack={() => navigate('/')}
                onRestart={() => resetGame()}
                isWinner={isWinner}
                secretSong={secretSong}
            />
            {/* h-full + overflow-y-auto: page scrolls internally, preventing dropdown from growing the document */}
            <section className="h-full overflow-y-auto overflow-x-hidden">
                <div className="flex items-center justify-center px-4 py-10 sm:py-12 flex-col gap-8 max-w-xl mx-auto">

                {/* Artist avatar with play button */}
                <picture className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full ring-2 ring-green-sp/40 ring-offset-2 ring-offset-transparent z-10 pointer-events-none" />

                    <img
                        src={artist?.images[0]?.url}
                        alt={`${artist?.name || 'sin encontrar'} en Soundle`}
                        className={`h-40 w-40 sm:h-48 sm:w-48 object-cover rounded-full ${isPlaying ? 'animation-rotate' : ''}`}
                    />

                    {/* Play/Pause button always visible */}
                    {!isPlaying ? (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 m-auto z-20 flex items-center justify-center cursor-pointer"
                        >
                            <FaPlay size={28} color={"#1db954"} className="drop-shadow-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute inset-0 m-auto z-20 flex items-center justify-center cursor-pointer"
                        >
                            <FaPause size={28} color={"#1db954"} className="drop-shadow-lg" />
                        </button>
                    )}
                </picture>

                <AudioPlayer
                    key={secretSongAudio || ''}
                    src={secretSongAudio || ''}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    timeLimit={gameOver ? 15 : (15 / (5 - activeInputIndex))}
                    onEnd={() => setIsPlaying(false)}
                />

                {/* Guess inputs */}
                <section className="w-full">
                    {guessInputs.map((guess, index) => (
                        <div key={index} className="relative mb-2">
                            <input
                                type="text"
                                value={guess.value}
                                disabled={guess.disabled}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, guess.value)}
                                placeholder={!guess.disabled ? `Intento ${index + 1} — escribe el nombre...` : ''}
                                className={`w-full px-4 py-2.5 rounded-lg outline-none font-roboto text-sm transition-colors
                                    placeholder:text-white/20
                                    ${
                                        guess.color === "green"
                                            ? "bg-green-500/25 text-green-300 border border-green-500/40"
                                            : guess.color === "yellow"
                                            ? "bg-yellow-400/20 text-yellow-200 border border-yellow-400/40"
                                            : guess.color === "red"
                                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                            : "bg-white/[0.06] text-white border border-white/10"
                                    }
                                    disabled:cursor-default
                                `}
                            />

                            {activeInputIndex === index && filteredSuggestions.length > 0 && !gameOver && (
                                <ul className="absolute z-50 w-full mt-1
                                    bg-[#1c1c1c] border border-white/10 rounded-lg shadow-xl
                                    max-h-52 overflow-y-auto">
                                    {filteredSuggestions.slice(0, 6).map((song, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => handleGuess(song.name)}
                                            className="px-4 py-2.5 text-sm text-white/80 hover:text-white
                                                hover:bg-white/[0.08] cursor-pointer transition-colors
                                                border-b border-white/5 last:border-0"
                                        >
                                            <span className="font-medium">{song.name}</span>
                                            <span className="text-white/30 ml-2 text-xs">{song.album}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>

                </div>  {/* end inner flex div */}
            </section>
        </Layout>
    );
}
