'use client'

import { useAuth } from "@/app/context/contextProvider";
import { Homes, Booking } from "@/app/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addBooking } from "@/app/lib/homeUtils";
import { Timestamp } from 'firebase/firestore';

export default function BookingPage({ params }: { readonly params: Promise<{ id: string }> }) {
    const { fetchHomeById, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [home, setHome] = useState<Homes | null>(null);
    const [payment, setPayment] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // PARAMS FROM URL
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const [startDate, setStartDate] = useState<Date | null>(startDateParam ? new Date(startDateParam) : null);
    const [endDate, setEndDate] = useState<Date | null>(endDateParam ? new Date(endDateParam) : null);

    useEffect(() => {
        const initializePage = async () => {
            const { id } = await params;
            if (id) {
                const homeData = await fetchHomeById(id);
                setHome(homeData);
            }
        };

        initializePage();
    }, [params, fetchHomeById]);

    const paymentChooser = (paymentType: string) => {
        setPayment(paymentType);
    };

    const handlePayment = async () => {
        if (!user) {
            setMessage("Please log in to complete your booking.");
            return;
        }
    
        if (!payment) {
            setMessage("Vänligen välj ett betalsätt");
            return;
        }
    
        if (!startDate || !endDate) {
            setMessage("Please select valid booking dates.");
            return;
        }
    
        const booking: Booking = {
            homeId: (await params).id,
            userId: user.id!,
            startDate: new Timestamp(startDate!.getTime() / 1000, 0),
            endDate: new Timestamp(endDate!.getTime() / 1000, 0),
        };
    
        try {
            await addBooking(booking);
            router.push(`/successPage/${(await params).id}`);
        } catch (error) {
            setMessage("An error occurred while processing your booking. Please try again.");
            console.error("Booking error:", error);
        }
    };
    

    return (
        <div className="booking-page">
            {home ? (
                <div>
                    <h1>Välj betalsätt</h1>
                    <div className={`payment-card ${payment === 'mastercard' ? 'selected' : ''}`} onClick={() => paymentChooser('mastercard')}>
                        <img className="mastercard-svg" src="/svg/mc.svg" alt="MC" />
                        <div>
                            <p>MASTER CARD</p>
                            <p>****6354</p>
                        </div>
                    </div>
                    <div className={`payment-card ${payment === 'visa' ? 'selected' : ''}`} onClick={() => paymentChooser('visa')}>
                        <img className="visa-svg" src="/svg/visa.svg" alt="VISA" />
                        <div>
                            <p>VISA</p>
                            <p>****6354</p>
                        </div>
                    </div>
                    <div className={`payment-card ${payment === 'swish' ? 'selected' : ''}`} onClick={() => paymentChooser('swish')}>
                        <img className="swish-svg" src="/svg/swish.svg" alt="SWISH" />
                        <p>SWISH</p>
                    </div>
                    <div className={`payment-card ${payment === 'klarna' ? 'selected' : ''}`} onClick={() => paymentChooser('klarna')}>
                        <img className="klarna-svg" src="/svg/klarna.svg" alt="KLARNA" />
                        <p>KLARNA</p>
                    </div>

                    {/* Error or success message */}
                    {message && <p>{message}</p>}

                    {/* Payment button */}
                    <button onClick={handlePayment} className="book-payment-button">Betala</button>
                </div>
            ) : (
                <p>Loading booking details...</p>
            )}
        </div>
    );
}
