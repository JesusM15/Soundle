import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getArtists } from "../utils/callApi";
import ArtistCard from "../components/ArtistCard";
import { ScaleLoader } from "react-spinners";

function ArtistScreen(){
    const [ isLoading, setIsLoading ] = useState(true);
    const [ artists, setArtists ] = useState([]);

    const componentDidMount = async() => {
        setIsLoading(true);
        const data = await getArtists();
        setArtists(data);
        setIsLoading(false);
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    if(isLoading) return (
        <section className="flex items-center justify-center h-screen w-full background">
            <ScaleLoader color={"#1db954"} />
        </section>
    );

    return (
        <Layout>
            <section className="h-full overflow-y-auto" id="artists">
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-5 text-center">
                        Elige un artista para comenzar
                    </p>
                    <div className="flex flex-col gap-3 pb-6">
                        {artists?.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default ArtistScreen;