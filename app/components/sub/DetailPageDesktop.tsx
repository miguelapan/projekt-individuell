'use client';

import { useRouter } from "next/navigation";
import { BookingDetails } from "@/app/components/sub/BookingDetails";
import { Homes } from "@/app/lib/types";
import FilledStar from "./FilledStar";
import EmptyStar from "./EmptyStar";

interface DetailPageDesktopProps {
    home: Homes | null;
    startDate: string;
    endDate: string;
    guests?: string | null;
}

export default function DetailPageDesktop({
    home,
    startDate,
    endDate,
    guests,
}: Readonly<DetailPageDesktopProps>) {
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

    const renderStars = () => {
        const maxStars = 5; // Total number of stars
        return Array.from({ length: maxStars }, (_, index) =>
            index < (home.rating || 0) ? (
                <FilledStar key={index} />
            ) : (
                <EmptyStar key={index} />
            )
        );
    };

    console.log(home.images)

    return (
        <div className="detail-page">
            <div className="detail-container">
                <h2 className="detail-title">{home.title}</h2>
                
                <div className="detail-card-image">
    {home.images.map((image, index) => (
        <img key={index} className="detail-image" src={image} alt={`Image ${index + 1}`} />
    ))}
    <BookingDetails
        home={home}
        startDate={startDate}
        endDate={endDate}
        onBookingClick={handleBookingClick}
    />
</div>

                <div className="detail-card-description">
                    <div className="detail-rating">
                        {renderStars()} 
                    </div>
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
        </div>
    );
}
