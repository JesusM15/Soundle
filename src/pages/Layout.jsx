import React from "react";
import Header from "../components/Header";

export default function Layout({ children }){

    return <main className="min-h-svh background">
        <Header />
        {children}
    </main>
}