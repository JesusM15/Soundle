import React from "react";

function GameCompleteModal({ isVisible, isWinner, onRestart, onBack }){
    
    if(!isVisible) return null;

    return <article className="h-screen text-white w-full justify-center bg-black/10 p-4 absolute flex  items-center top-0 bottom-0 left-0 right-0 m-auto z-50 flex-col">
        <div className="bg-black/90 rounded-xl  gap-2 p-4 w-full sm:w-md flex flex-col items-center">
            <h3 className="text-white font-roboto text-xl font-semibold">
                {isWinner ? "Felicidades acertaste!" : "Sigue intentando :("}
            </h3>
            <p className="text-white">¿Qué deseas hacer ahora?</p>
            <div className="flex gap-6 pt-4 w-full">
                <button 
                onClick={onRestart}
                className="flex-1 bg-green-400/40 py-2 px-4 cursor-pointer
                    hover:bg-green-400/60 transition-colors
                ">
                    Nueva canción
                </button>
                <button 
                onClick={onBack}
                className="flex-1 bg-red-500/40 py-2 px-4 cursor-pointer
                    hover:bg-red-500/60 transition-colors
                ">
                    Regresar
                </button>
            </div>
        </div>
    </article>
}

export default GameCompleteModal;