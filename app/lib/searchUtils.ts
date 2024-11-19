import { Homes } from "@/app/lib/types";
import { Timestamp } from "firebase/firestore";

export const filterHomes = (
    homes: Homes[],
    location: string,
    startDate: string,
    endDate: string,
    guests: number
): Homes[] => {
    return homes.filter((home) => {
        // Location Check
        const matchesLocation = location ? home.location.toLowerCase().includes(location.toLowerCase()) : true;

        // Capacity Check
        const matchesGuests = guests <= home.capacity;

        // Date Check
        const searchHasDates = startDate && endDate;
        const searchStart = searchHasDates ? new Date(startDate) : null;
        const searchEnd = searchHasDates ? new Date(endDate) : null;

        const matchesDates = searchHasDates
            ? !(
                home.bookings && home.bookings.some((booking) => {

                    const bookingStart = booking.startDate instanceof Timestamp
                        ? booking.startDate.toDate()
                        : new Date((booking.startDate as Timestamp).seconds * 1000);

                    const bookingEnd = booking.endDate instanceof Timestamp
                        ? booking.endDate.toDate()
                        : new Date((booking.endDate as Timestamp).seconds * 1000);

                    return searchStart && searchEnd && (searchStart <= bookingEnd && searchEnd >= bookingStart);
                })
            )
            : true;

        return matchesLocation && matchesGuests && matchesDates;
    });
};
