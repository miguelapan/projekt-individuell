'use client'
import { useEffect, useState } from "react";
import { Login } from "./forms/Login";
import { useAuth } from "../context/contextProvider";
import Link from "next/link";

export const Header = () => {

    const { user, logout } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)

    const modalHandler = () => {
        setModalOpen(!modalOpen)
    }
    return (
        <header>
        <Link href={'/'}><img className="logoSVG" src="/svg/LOGO.svg" alt="LOGO" /></Link>
        {user ? 
        <div><p>Välkommen {user.userName}</p> <button onClick={logout}>LOGGA UT</button></div> : <button onClick={modalHandler}>Bli medlem</button>}
        
        {modalOpen && <Login modalHandler={modalHandler}/>}
        </header>
    );
}