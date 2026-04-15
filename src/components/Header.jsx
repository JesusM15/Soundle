import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InstructionsModal from "./InstructionsModal";

function Header() {
    const [showInstructions, setShowInstructions] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isGameScreen = location.pathname.startsWith("/game/");

    return (
        <>
            <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
            <nav className="border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-40">
                <div className="flex items-center justify-between px-5 py-3 max-w-3xl mx-auto">

                    {/* Left: back arrow on game screen, spacer otherwise */}
                    {isGameScreen ? (
                        <button
                            onClick={() => navigate("/")}
                            title="Regresar"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-white/60
                                hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    ) : (
                        <div className="w-8" />
                    )}

                    <h4 className="text-white font-pacifico text-2xl tracking-wide select-none">
                        Sound<span className="text-green-sp">le</span>
                    </h4>

                    {/* Right: help button */}
                    <button
                        onClick={() => setShowInstructions(true)}
                        title="Cómo jugar"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/60
                            hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.345 0 4.667-.745.653-1.77.993-2.811 1.009v.518a.75.75 0 01-1.5 0v-1.252a.75.75 0 01.75-.75c.728 0 1.45-.253 1.968-.704.518-.453.787-1.046.787-1.664 0-.618-.269-1.21-.787-1.664l.606.07zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                    </button>

                </div>
            </nav>
        </>
    );
}

export default Header;