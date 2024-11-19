'use client'

import { useAuth } from "../context/contextProvider";
import Link from "next/link";

export const Header = () => {

    const { user, logout, modalOpen, toggleModal } = useAuth()
    return (
        <header>
        <Link href={'/'}><img className="logoSVG" src="/svg/LOGO.svg" alt="LOGO" /></Link>
        {user ? 
        <div><p>Välkommen {user.userName}</p> <button onClick={logout}>LOGGA UT</button></div> : <button onClick={toggleModal}>Bli medlem</button>}
        
        </header>
    );
}