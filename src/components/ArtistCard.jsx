import React from "react"
import { getSongs } from "../utils/callApi"
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }){

    return (
        <article className="background-linear h-96 flex-1 w-full flex p-2
            rounded-md
        ">
           <a href={artist.link} target="_blank">
                <img    
                    src={artist.image}
                    alt={`${artist.name} on Soundle`}
                    className="h-36 rounded-full"
                />
            </a> 
            <div className="text-white font-roboto flex p-4 flex-col flex-1">
                <h3 className="font-semibold text-2xl">
                    {artist.name}
                </h3>
                <p className="text-sm flex gap-1 items-center">
                    <FaUsers color={""} className="text-green-sp" /> {artist?.followers.toLocaleString("EN-US")} Seguidores                    
                </p>
            </div>
            <div className="items-end flex">
                <Link className="text-white bg-green-400/20 px-6 p-1
                    rounded-sm border border-green-900
                "
                to={`/game/${artist.id}`}
                >
                    Jugar
                </Link>
            </div>
        </article>
    )
}