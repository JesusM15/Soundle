import React from "react";
import { FaPlay, FaMusic } from "react-icons/fa";

const colorExamples = [
    {
        bg: "bg-green-500/25",
        border: "border-green-500/40",
        text: "text-green-300",
        songName: "Shake It Off",
        albumName: "1989",
        description: "¡Acertaste! Es la canción correcta.",
    },
    {
        bg: "bg-yellow-400/20",
        border: "border-yellow-400/40",
        text: "text-yellow-200",
        songName: "Style",
        albumName: "1989",
        description: "Mismo álbum, pero no es esa canción.",
    },
    {
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        text: "text-red-300",
        songName: "Lover",
        albumName: "Lover",
        description: "Incorrecto. Ni la canción ni el álbum.",
    },
];

function InstructionsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <article
                className="relative bg-[#181818] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                <h2 className="text-white font-pacifico text-xl mb-1">
                    Sound<span className="text-green-sp">le</span>
                </h2>
                <p className="text-white/50 text-sm mb-5">¿Cómo jugar?</p>

                {/* Steps */}
                <ol className="text-white/80 text-sm space-y-3 mb-6 list-none">
                    <li className="flex gap-3 items-start">
                        <span className="text-green-sp font-bold mt-0.5">1.</span>
                        <span>
                            Presiona el botón{" "}
                            <strong className="text-white inline-flex items-center gap-1">
                                <FaPlay size={10} className="text-green-sp" /> Play
                            </strong>{" "}
                            para escuchar un fragmento de la canción secreta.
                        </span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-green-sp font-bold mt-0.5">2.</span>
                        <span>Escribe el nombre de la canción y selecciona de las sugerencias.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-green-sp font-bold mt-0.5">3.</span>
                        <span>
                            Tienes <strong className="text-white">5 intentos</strong>. Con cada error escucharás un poco más.
                        </span>
                    </li>
                </ol>

                {/* Visual color examples */}
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                    ¿Qué significa cada color?
                </p>

                <div className="space-y-3">
                    {colorExamples.map(({ bg, border, text, songName, albumName, description }) => (
                        <div key={songName} className="flex flex-col gap-1.5">
                            {/* Mock input */}
                            <div className={`w-full px-4 py-2.5 rounded-lg border ${bg} ${border} flex items-center justify-between`}>
                                <div className="flex items-center gap-2 min-w-0">
                                    <FaMusic size={11} className={`${text} flex-shrink-0 opacity-70`} />
                                    <span className={`${text} text-sm font-medium truncate`}>{songName}</span>
                                </div>
                                <span className="text-white/25 text-xs ml-3 flex-shrink-0">{albumName}</span>
                            </div>
                            {/* Description */}
                            <p className="text-white/50 text-xs pl-1">{description}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full py-2.5 rounded-lg bg-green-sp/20 text-green-sp text-sm font-semibold
                        hover:bg-green-sp/30 transition-colors cursor-pointer border border-green-sp/30"
                >
                    ¡Entendido!
                </button>
            </article>
        </div>
    );
}

export default InstructionsModal;
