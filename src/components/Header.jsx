import React from "react";
import { IoMdSettings } from "react-icons/io";

function Header(){

    return <nav className="border-b border-gray-300 flex">
        <ul className="flex p-3 justify-between flex-1 place-items-center">
            <li className="opacity-90 flex-1">
                <IoMdSettings  size={32} color={"#f3f3f3"} />
            </li>
            <li className="flex-1">
                <h4 className="text-white font-pacifico text-2xl">
                    Sound<span className="text-green-sp ">le</span>
                </h4>
            </li>
        </ul>
    </nav>
};

export default Header;