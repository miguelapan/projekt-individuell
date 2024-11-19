import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { FC } from "react";
import { Login } from "../forms/Login";

interface BookingDetailProps {
    home: Homes;
    startDate: string;
    endDate: string;
    onBookingClick: () => void;
}
export const BookingDetails: FC<BookingDetailProps> = ({ 
    home, 
    startDate,
    endDate,
    onBookingClick,
}) => {

    const { user, modalOpen, toggleModal } = useAuth();

    return(
        <div className="detail-temporary">
                            <p>Bokningsinfo</p>
                            <p>Modernt hus</p>
                            <p>Datum {startDate} - {endDate}</p>
                            <p>Antal gäster: {home.capacity}</p>
                            <p>Pris: 100kr</p>
                            <p>TOTAL: {home.price}</p>
                            {user ? (
                                <button onClick={onBookingClick} className="detail-button">
                                    Boka
                                </button>
                            ) : (
                                <button onClick={toggleModal} className="detail-button">
                                    Logga in för att boka
                                </button>
                            )}
                            {modalOpen && <Login modalHandler={toggleModal}/>}
                        </div>
)
}