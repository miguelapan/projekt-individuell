'use client'

import { Login } from "@/app/components/forms/Login";
import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function DetailPage({ params }: { readonly params: { id: string } }) {
    const { fetchHomeById, user } = useAuth();
    const [home, setHome] = useState<Homes | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const guests = searchParams.get('guests');

    useEffect(() => {
        const fetchHome = async () => {
            const { id } = await params;
            if (id) {
                const home = await fetchHomeById(id);
                setHome(home);
            }
        };
        fetchHome();
    }, [params, fetchHomeById]);

    const modalHandler = () => setModalOpen(!modalOpen);

    const handleBookingClick = async () => {
        const { id } = await params;
        if (startDate && endDate) {
            router.push(`/details/${id}/booking?startDate=${startDate}&endDate=${endDate}`);
        } else {
            setModalOpen(true); // Ask user to enter dates if they're not provided
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
            // KOLLA PÅ DETTA 
        }
    };

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
                            <p>Datum {startDate} - {endDate}</p>
                            <p>Antal gäster: {home.capacity}</p>
                            <p>Pris: 100kr</p>
                            <p>TOTAL: {home.price}</p>
                            {user ? (
                                <button onClick={handleBookingClick} className="detail-button">
                                    Boka
                                </button>
                            ) : (
                                <button onClick={modalHandler} className="detail-button">
                                    Logga in för att boka
                                </button>
                            )}
                            {modalOpen && <Login modalHandler={modalHandler} />}
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
