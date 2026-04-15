import React from "react";
import { FaMusic, FaSadTear } from "react-icons/fa";

function GameCompleteModal({ isVisible, isWinner, onRestart, onBack, secretSong }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Card */}
            <article className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10">

                {/* Top color strip */}
                <div className={`h-1.5 w-full ${isWinner ? 'bg-green-sp' : 'bg-red-500'}`} />

                <div className="bg-[#181818] px-6 pt-6 pb-7">

                    {/* Icon + Title */}
                    <div className="flex flex-col items-center text-center mb-5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3
                        ${isWinner ? 'bg-green-sp/15' : 'bg-red-500/15'}`}>
                        {isWinner
                            ? <FaMusic size={24} className="text-green-sp" />
                            : <FaSadTear size={24} className="text-red-400" />
                        }
                    </div>
                        <h3 className="text-white font-semibold text-xl">
                            {isWinner ? '¡Acertaste!' : 'Sigue intentando'}
                        </h3>
                        {!isWinner && secretSong && (
                            <p className="text-white/40 text-sm mt-1">
                                La canción era
                            </p>
                        )}
                    </div>

                    {/* Song reveal card */}
                    {secretSong && (
                        <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 
                            ${isWinner
                                ? 'bg-green-500/10 border border-green-500/20'
                                : 'bg-white/[0.05] border border-white/10'
                            }`}
                        >
                            {/* Music note icon */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                                ${isWinner ? 'bg-green-sp/20' : 'bg-white/10'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className={`w-5 h-5 ${isWinner ? 'text-green-sp' : 'text-white/50'}`}>
                                    <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-semibold text-sm truncate">{secretSong.name}</p>
                                <p className="text-white/40 text-xs truncate">{secretSong.album}</p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onRestart}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer
                                bg-green-sp/20 text-green-sp border border-green-sp/30
                                hover:bg-green-sp hover:text-black transition-all duration-200"
                        >
                            Nueva canción
                        </button>
                        <button
                            onClick={onBack}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer
                                bg-white/[0.05] text-white/70 border border-white/10
                                hover:bg-white/10 hover:text-white transition-all duration-200"
                        >
                            Artistas
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default GameCompleteModal;