import React from "react"
import { getSongs } from "../utils/callApi"
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }){

    return (
        <article className="background-linear h-96 flex-1 w-full flex p-2
            rounded-md sm:flex-row flex-col items-center
        ">
           <a href={artist.link} target="_blank">
                <img    
                    src={artist.image}
                    alt={`${artist.name} on Soundle`}
                    className="h-24 w-24 sm:w-36 sm:h-36 rounded-full object-cover "
                />
            </a> 
            <div className="text-white font-roboto flex p-2 sm:p-4 flex-col flex-1">
                <h3 className="font-semibold text-md sm:text-2xl">
                    {artist.name}
                </h3>
                <p className="text-sm sm:flex hidden gap-1 items-center">
                    <FaUsers color={""} className="text-green-sp" /> {artist?.followers.toLocaleString("EN-US")} Seguidores                    
                </p>
            </div>
            <div className="items-end flex">
                <Link className="text-white bg-green-400/20 sm:px-6 px-12 p-1
                    rounded-sm border border-green-900 hover:bg-green-400/50 transition-colors
                    sm:text-md text-sm
                    "
                to={`/game/${artist.id}`}
                >
                    Jugar
                </Link>
            </div>
        </article>
    )
}