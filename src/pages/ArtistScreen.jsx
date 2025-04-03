import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getArtists } from "../utils/callApi";
import ArtistCard from "../components/ArtistCard";

function ArtistScreen(){
    const [ artists, setArtists ] = useState([]);

    const componentDidMount = async() => {
        const data = await getArtists();
        setArtists(data);
    }

    useEffect(() => {
        componentDidMount();
    }, []);

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