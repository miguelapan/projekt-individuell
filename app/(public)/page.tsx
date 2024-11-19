'use client';

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { SearchForm } from "../components/forms/SearchForm";
import { HomeList } from "../components/lists/HomeList";
import { NavbarMobile } from "../components/NavbarMobile";
import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { filterHomes } from "@/app/lib/searchUtils";
import { Login } from "../components/forms/Login";
import { useIsMobile } from "@/app/hooks/isMobile";
import DesktopAd from "../components/sub/DesktopAd";

export default function Home() {
    const { homeData, modalOpen, toggleModal } = useAuth();
    const isMobile = useIsMobile();

    const [filteredHomes, setFilteredHomes] = useState<Homes[]>([]);
    const [location, setLocation] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);

    const handleSearch = useCallback(() => {
        const updatedFilteredHomes = filterHomes(homeData, location, startDate, endDate, guests);
        setFilteredHomes(updatedFilteredHomes);
        console.log("Filtered Homes after search:", updatedFilteredHomes);
    }, [homeData, location, startDate, endDate, guests]); 

    const handleLocationChange = useCallback((value: string) => setLocation(value), []);
    const handleStartDateChange = useCallback((value: string) => setStartDate(value), []);
    const handleEndDateChange = useCallback((value: string) => setEndDate(value), []);
    const handleGuestsChange = useCallback((value: number) => setGuests(value), []);

    useEffect(() => {
        setFilteredHomes(homeData);
    }, [homeData]);

    return (
        <>
            {isMobile ? (
                <NavbarMobile
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                    onLocationChange={handleLocationChange}
                    onStartDateChange={handleStartDateChange}
                    onEndDateChange={handleEndDateChange}
                    onGuestsChange={handleGuestsChange}
                    onSearch={handleSearch}
                />
            ) : (
                <SearchForm
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                    onLocationChange={handleLocationChange}
                    onStartDateChange={handleStartDateChange}
                    onEndDateChange={handleEndDateChange}
                    onGuestsChange={handleGuestsChange}
                    onSearch={handleSearch}
                />
            )}
            <Image className="image-main" src="/images/test-photo.avif" alt="hero" width={1032} height={580.5} />

            <DesktopAd />
            
            {filteredHomes.length === 0 ? (
                <p className="no-results">Inga resultat hittades</p>
            ) : (
                <HomeList filteredHomes={filteredHomes} startDate={startDate} endDate={endDate} guests={guests} />
            )}
            {modalOpen && <Login modalHandler={toggleModal} />}
        </>
    );
}
