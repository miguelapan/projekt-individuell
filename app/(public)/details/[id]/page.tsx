'use client'

import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function DetailPage({params}: { readonly params: {id: string}}) {
    const { fetchHomeById } = useAuth();
    const [home, setHome] = useState<Homes | null>(null);

    useEffect(() => {
        const fetchHome = async () => {
            const { id } = await params;

            if(id){
                const home = await fetchHomeById(id);
                setHome(home);
            }
        };
        fetchHome();
    }, []);
    return (
        <div className="detail-page">
            {home ? (
                <div className="detail-container">
                    <h2 className="detail-title">{home.title}</h2>
                    <div className="detail-card-image">

                    <img className="detail-image" src={home.images[0]} alt="hero" />
                    <div className="detail-temporary">
                        <p>Bokningsinfo</p>
                        <p>Modernt hus</p>
                        <p>Datum</p>
                        <p>Antal gäster</p>
                        <p>PRis 100kr</p>
                        <p>TOTAL: {home.price}</p>
                        <button className="book-button">BOKA</button>
                    </div>
                    </div>
                    <div className="detail-card-description">
                    <p className="detail-rating">{home.rating}</p>
                    <p className="detail-description">{home.description}</p>
                    </div>
                    <p className="detail-equipment-second-header">Detta rum är utrustat med:</p>
                    <div className="detail-equipment-div">
                        <ul>
                            {Object.entries(home.equipment).map(([key, value]) => (
                                <li key={key}>
                                    {key}: {value ? "Ja" : "Nej"}
                                    </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}