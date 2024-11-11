
'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchForm } from "./components/forms/SearchForm";
import { HomeList } from "./components/lists/HomeList";
import { NavbarMobile } from "./components/NavbarMobile";
import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "./lib/types";
import { Timestamp } from "firebase/firestore";


export default function Home() {
    const { homeData } = useAuth();

    const [filteredHomes, setFilteredHomes] = useState<Homes[]>([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [location, setLocation] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);

    useEffect(() => {
        setFilteredHomes(homeData);
    }, [homeData]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const handleSearch = () => {
    //     console.log("Search parameters: ", location, startDate, endDate, guests);
    
    //     const updatedFilteredHomes = homeData.filter((home) => {
    //         // Location Check
    //         const matchesLocation = location ? home.location.toLowerCase().includes(location.toLowerCase()) : true;
            
    //         // Capacity Check
    //         const matchesGuests = guests <= home.capacity;
    
    //         // Date Check
    //         const searchHasDates = startDate && endDate;
    //         const searchStart = searchHasDates ? new Date(startDate) : null;
    //         const searchEnd = searchHasDates ? new Date(endDate) : null;
    
    //         const matchesDates = searchHasDates
    //             ? !(
    //                 home.bookings && home.bookings.some((booking) => {
    //                     // Convert Firebase Timestamp to Date (if it's a Firebase Timestamp object)
    //                     const bookingStart = booking.startDate instanceof Date
    //                         ? booking.startDate
    //                         : new Date(booking.startDate.seconds * 1000); // Convert seconds to milliseconds
                        
    //                     const bookingEnd = booking.endDate instanceof Date
    //                         ? booking.endDate
    //                         : new Date(booking.endDate.seconds * 1000); // Convert seconds to milliseconds
    
    //                     // Ensure booking dates are valid
    //                     const isValidBookingDates = bookingStart instanceof Date && !isNaN(bookingStart.getTime()) &&
    //                         bookingEnd instanceof Date && !isNaN(bookingEnd.getTime());
    
    //                     if (!isValidBookingDates) {
    //                         console.warn(`Invalid booking dates for home ID ${home.id}:`, { bookingStart, bookingEnd });
    //                         return false; // Invalid booking, don't consider it as an overlap
    //                     }
    
    //                     console.log(`Checking booking for home ID ${home.id}:`, {
    //                         bookingStart,
    //                         bookingEnd,
    //                         searchStart,
    //                         searchEnd,
    //                         isOverlap: searchStart && searchEnd &&
    //                             (searchStart <= bookingEnd && searchEnd >= bookingStart),
    //                     });
    
    //                     return (
    //                         searchStart && searchEnd &&
    //                         (searchStart <= bookingEnd && searchEnd >= bookingStart)
    //                     );
    //                 })
    //             )
    //             : true; // If no dates, always matches
    
    //         return matchesLocation && matchesGuests && matchesDates;
    //     });
    
    //     setFilteredHomes(updatedFilteredHomes);
    //     console.log("Filtered Homes after search:", updatedFilteredHomes);
    // };

    const handleSearch = () => {
        console.log("Search parameters: ", location, startDate, endDate, guests);
    
        const updatedFilteredHomes = homeData.filter((home) => {
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
                        // Convert Firebase Timestamp to Date (if it's a Firebase Timestamp object)
                        const bookingStart = booking.startDate instanceof Timestamp
                            ? booking.startDate.toDate()
                            : new Date((booking.startDate as Timestamp).seconds * 1000);
                        
                        const bookingEnd = booking.endDate instanceof Timestamp
                            ? booking.endDate.toDate()
                            : new Date((booking.endDate as Timestamp).seconds * 1000); 
    
                        // Ensure booking dates are valid
                        const isValidBookingDates = bookingStart instanceof Date && !isNaN(bookingStart.getTime()) &&
                            bookingEnd instanceof Date && !isNaN(bookingEnd.getTime());
    
                        if (!isValidBookingDates) {
                            console.warn(`Invalid booking dates for home ID ${home.id}:`, { bookingStart, bookingEnd });
                            return false; // Invalid booking, don't consider it as an overlap
                        }
    
                        console.log(`Checking booking for home ID ${home.id}:`, {
                            bookingStart,
                            bookingEnd,
                            searchStart,
                            searchEnd,
                            isOverlap: searchStart && searchEnd &&
                                (searchStart <= bookingEnd && searchEnd >= bookingStart),
                        });
    
                        return (
                            searchStart && searchEnd &&
                            (searchStart <= bookingEnd && searchEnd >= bookingStart)
                        );
                    })
                )
                : true; 
    
            return matchesLocation && matchesGuests && matchesDates;
        });
    
        setFilteredHomes(updatedFilteredHomes);
        console.log("Filtered Homes after search:", updatedFilteredHomes);
    };
    


    return (
        <>
            {isMobile ? (
                <NavbarMobile />
            ) : (
                <SearchForm
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                    onLocationChange={setLocation}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onGuestsChange={setGuests}
                    onSearch={handleSearch}
                />
            )}
            <Image className="image-main" src="/images/test-photo.avif" alt="hero" width={1032} height={580.5} />
            {filteredHomes.length === 0 ? ( 
                <p className="no-results">Inga resultat hittades</p> 
            ) : (
            <HomeList
            filteredHomes={filteredHomes}
            startDate={startDate}
            endDate={endDate}
            guests={guests}
            />
        )}
        </>
    );
}
