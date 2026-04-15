import React from "react";
import Header from "../components/Header";

export default function Layout({ children }) {
    return (
        <main className="h-full flex flex-col background">
            <Header />
            {/* Content area: fills remaining height, each page controls its own scroll */}
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </main>
    );
}