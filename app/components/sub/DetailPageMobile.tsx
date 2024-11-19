'use client';

import { useRouter } from "next/navigation";
import { BookingDetails } from "@/app/components/sub/BookingDetails";
import { Homes } from "@/app/lib/types";

interface DetailPageMobileProps {
    home: Homes | null;
    startDate: string;
    endDate: string;
    guests?: string | null;
}

export default function DetailPageMobile({
    home,
    startDate,
    endDate,
    guests,
}: DetailPageMobileProps) {
    const router = useRouter();

    const handleBookingClick = () => {
        if (!home?.id) return;
        if (startDate && endDate) {
            router.push(`/details/${home.id}/booking?startDate=${startDate}&endDate=${endDate}`);
        } else {
            console.log("Please select dates");
        }
    };

    if (!home) return <h2>Loading...</h2>;

    return (
        <div className="detail-page-mobile">
            <div className="detail-container-mobile">
                <h2 className="detail-title-mobile">{home.title}</h2>
                HELLO MOBILE
                <div className="detail-card-image-mobile">
                    <img className="detail-image-mobile" src={home.images[0]} alt="hero" />
                <div className="detail-card-description-mobile">
                    <p className="detail-rating-mobile">{home.rating}</p>
                    <p className="detail-description-mobile">{home.description}</p>
                </div>
                    {/* <BookingDetails
                        home={home}
                        startDate={startDate}
                        endDate={endDate}
                        onBookingClick={handleBookingClick}
                    /> */}
                </div>

                <p className="detail-equipment-second-header-mobile">Detta rum är utrustat med:</p>
                <div className="detail-equipment-div-mobile">
                    <ul>
                        {Object.entries(home.equipment).map(([key, value]) => (
                            <li key={key}>
                                {key}: {value ? "Ja" : "Nej"}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detail-booking-nav-mobile">
                    <div>
                        <p>{home.price} kr per natt</p>
                        <p>{startDate}-{endDate} </p>
                    </div>
                        <button className="search-button" onClick={handleBookingClick}>BOKA</button>
                </div>
            </div>
        </div>
    );
}
