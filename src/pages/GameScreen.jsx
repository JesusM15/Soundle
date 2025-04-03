import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { getSongs, getAlbumTracks } from "../utils/callApi";
import { FaPlay, FaPause } from "react-icons/fa";

export default function GameScreen(){    
    const { id, artist_image } = useParams();
    const [ songs, setSongs ] = useState([]);
    const [ level, setLevel ] = useState(0);
    const [ albumTracks, setAlbumTracks ] = useState([]);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ secretSong, setSecretSong ] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const audioRef = useRef(null);

    const componentDidMount = async() => {
        const data = await getSongs(id);
        setSongs(data);
        if (data.length > 0) {
            const albumTracks = await getAlbumTracks(data[0]?.album?.id);
            setAlbumTracks(albumTracks);
        }
    }

    useEffect(() => {
        componentDidMount();
    }, [id])
    
    useEffect(() => {
        const secretSong = songs[level];
        setSecretSong(secretSong);
        // setLevel(prev => prev+1);
    }, [id, songs]);


    useEffect(() => {
        console.log(secretSong);
    }, [secretSong]);

    useEffect(() => {
        if(isPlaying){
            audioRef.current.play();
        }else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return <Layout>
        <section className="flex items-center justify-center p-12">
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
                    src={secretSong?.artists?.images[0]?.url}
                    alt={`${secretSong?.artists?.name || 'sin encontrar'} en Soundle`}
                    className={`h-48 rounded-full ${isPlaying ? 'animation-rotate' : ''}`}
                />
            </picture>

            
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0Zp34KjC2hUTTbo67fVFQt?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <audio ref={audioRef} src={secretSong?.external_urls} />
        </section>
    </Layout>
}