// 'use client'

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { SearchForm } from "./components/forms/SearchForm";
// import { HomeList } from "./components/lists/HomeList";
// import { NavbarMobile } from "./components/NavbarMobile";

// export default function Home() {

//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   // MOBILE RESPONSIVE NAVBAR
//   useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobile(true);
//     } else {
//       setIsMobile(false);
//     }
//   }

//   handleResize()

//   window.addEventListener('resize', handleResize)

//   return () => {
//     window.removeEventListener('resize', handleResize)
//   }
// }, []);

//   return (
//     <>
// {isMobile ? <NavbarMobile /> : <SearchForm />}
//       <Image 
//       className="image-main" 
//       src="/images/test-photo.avif" 
//       alt="hero" 
//       width={1032} 
//       height={580.5} />
//       <HomeList />
//     </>

//       )
// }

'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchForm } from "./components/forms/SearchForm";
import { HomeList } from "./components/lists/HomeList";
import { NavbarMobile } from "./components/NavbarMobile";
import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [location, setLocation] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [guests, setGuests] = useState<string>("");
    const [searchCriteria, setSearchCriteria] = useState<{ location: string; date: string; guests: string }>({ location: "", date: "", guests: "" });
    const { homeData } = useAuth();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredHomes = homeData.filter((home) => {
      const matchesLocation = searchCriteria.location ? home.location.toLowerCase().includes(searchCriteria.location.toLowerCase()) 
      : true;
        // SKA MAN KUNNA SORTERA GÄSTER OCH DATUM ??? KANSE 
        return matchesLocation;
    });

    const handleSearch = () => {
      setSearchCriteria({ location, date, guests });
    }

    return (
        <>
            {isMobile ? <NavbarMobile /> : (
                <SearchForm
                    location={location}
                    date={date}
                    guests={guests}
                    onLocationChange={setLocation}
                    onDateChange={setDate}
                    onGuestsChange={setGuests}
                    onSearch={handleSearch}
                />
            )}
            <Image className="image-main" src="/images/test-photo.avif" alt="hero" width={1032} height={580.5} />
            <HomeList filteredHomes={filteredHomes} />
        </>
    );
}
