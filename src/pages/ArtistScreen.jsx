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

    if(isLoading) return <section className="flex items-center justify-center h-screen w-full background">
        <ScaleLoader 
    color={"#1db954"} />
    </section>

    return <Layout>
        <section className=" flex flex-col" id="artists">
            {/* <p className="text-white opacity-80">
                Favor de seleccionar un artista para comenzar    
            </p>  */}
            <div className="flex flex-col gap-4 items-center p-4">
                {
                    artists?.map((artist) => <ArtistCard artist={artist} />)
                }
            </div>
        </section>
    </Layout>
}

export default ArtistScreen;