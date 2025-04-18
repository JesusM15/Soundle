import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { getSongs, getAlbumTracks, getArtist, getSecretSong } from "../utils/callApi";
import { FaPlay, FaPause } from "react-icons/fa";
import AudioPlayer from "../components/AudioPlayer";
import { ScaleLoader } from "react-spinners";
import './../index.css';
import GameCompleteModal from "../components/GameCompleteModal";

export default function GameScreen(){    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [ artist, setArtist ] = useState(null);
    const [ songs, setSongs ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ gameOver, setGameOver ] = useState(false);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ secretSong, setSecretSong ] = useState(null);
    const [guessInputs, setGuessInputs] = useState(
        Array.from({ length: 5 }, (_, i) => ({
            value: "",
            color: "",
            disabled: i !== 0, // Solo el primer input habilitado
        }))
    );
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const [ isWinner, setIsWinner ] = useState(false);
    const audioRef = useRef(null);

    const componentDidMount = async() => {
        setIsLoading(true);
        const artist = await getArtist(id);
        setArtist(artist);
        const data = await getSongs(id);
        setSongs(data);

        if (data.length > 0) {
            const secretSong = await getSecretSong(id);
            setSecretSong(secretSong);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        componentDidMount();
    }, [id])


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
            disabled: true
        };

        if (color !== "green" && activeInputIndex < 4) {
            updatedInputs[activeInputIndex + 1].disabled = false;
        }

        setGuessInputs(updatedInputs);

        if (color !== "green" && activeInputIndex < 4) {
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
            if(filteredSuggestions?.length > 0){
                const firstSuggestion = filteredSuggestions[0];
                handleInputChange(activeInputIndex, firstSuggestion.name);
                handleGuess(firstSuggestion.name);
            }else {
                handleGuess(value);
            }
        }
    };

    useEffect(() => {
        if(activeInputIndex == 4 && gameOver == false){
            setGameOver(true);
        }
    }, [activeInputIndex]);


    useEffect(() => {
        if(gameOver){
            // setIsPlaying(true);
        }
    }, [gameOver]);
    
    if(isLoading) return <section className="flex items-center justify-center h-screen w-full background">
        <ScaleLoader 
    color={"#1db954"} />
    </section>


    return <Layout>
        <GameCompleteModal 
            isVisible={gameOver}
            onBack={() => {
                navigate('/')
            }}
            onRestart={() => {
                navigate('/', {replace: true})
                navigate(`/game/${id}`, { replace: true });
            }}
            isWinner={isWinner}
        />
        <section className="flex items-center justify-center p-12 flex-col gap-12">
            <picture className="border-2 rounded-full border-green-600/90 relative">
                <button
                    className={`opacity-70 z-10 flex justify-center items-center
                        absolute top-0 bottom-0 left-0 right-0 m-auto cursor-pointer`}
                        onClick={() => {
                            setIsPlaying(prev => !prev);
                        }}
                >
            {!isPlaying ?       <FaPlay 
                        size={36}
                        color={"green"}
                        className={`text-green-sb `} />
                    
                    : <FaPause 
                        size={36}
                        color={"green"}
                        className={`text-green-sb `} 
                    
                    />}
                </button>
                
                <img 
                    src={artist?.images[0]?.url}
                    alt={`${artist?.name || 'sin encontrar'} en Soundle`}
                    className={`h-48 rounded-full ${isPlaying ? 'animation-rotate' : ''}`}
                />
            </picture>

            
            {/* {/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0Zp34KjC2hUTTbo67fVFQt?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
            <AudioPlayer 
                key={secretSong?.src} 
                src={secretSong?.src} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying}
                timeLimit={gameOver ? 15 : (15 / (5-activeInputIndex)) }
                onEnd={() => setIsPlaying(false)} 
            />

            <section className=" w-lg h-96 flex flex-col gap-2">
                {guessInputs.map((guess, index) => (
                        <div key={index} className="relative">
                            <input
                                type="text"
                                value={guess.value}
                                disabled={guess.disabled}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, guess.value)}
                                placeholder={!guess.disabled && `Escribe el nombre aquí...`}
                                className={`w-full p-2 rounded outline-none font-roboto
                                    ${guess.color === "green" ? "bg-green-400/60 text-white opacity-90" :
                                        guess.color === "yellow" ? "bg-yellow-400/60 text-gray-200 opacity-90" :
                                            guess.color === "red" ? "bg-red-400/60 text-white opacity-90" :
                                                "bg-gray-200/10 text-white opacity-60"}
                                `}
                            />

                            {activeInputIndex === index && filteredSuggestions.length > 0 && !gameOver &&  (
                                <ul className="absolute z-50 w-full bg-neutral-800
                                    text-white rounded -mt-0
                                    max-h-60 overflow-y-auto">
                                    {filteredSuggestions.slice(0, 5).map((song, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => handleGuess(song.name)}
                                            className="p-2 hover:bg-neutral-900/40 cursor-pointer"
                                        >
                                            {song.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

            </section>

          

        </section>
    </Layout>
}