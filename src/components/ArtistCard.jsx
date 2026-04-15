import React from "react"
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }){

    return (
        <article className="w-full flex items-center gap-4 p-4 rounded-xl
            bg-white/[0.04] border border-white/[0.07]
            hover:bg-white/[0.08] hover:border-white/15
            transition-all duration-200 cursor-default group"
        >
            {/* Avatar */}
            <a href={artist.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img
                    src={artist.image}
                    alt={`${artist.name} on Soundle`}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-green-sp/30
                        group-hover:ring-green-sp/60 transition-all duration-200"
                />
            </a>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                    {artist.name}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
                    <FaUsers className="text-green-sp flex-shrink-0" />
                    {artist?.followers?.toLocaleString("en-US")} fans
                </p>
            </div>

            {/* Play button */}
            <Link
                to={`/game/${artist.id}`}
                className="flex-shrink-0 text-sm font-semibold px-5 py-2 rounded-full
                    bg-green-sp/20 text-green-sp border border-green-sp/30
                    hover:bg-green-sp hover:text-black
                    transition-all duration-200"
            >
                Jugar
            </Link>
        </article>
    );
}