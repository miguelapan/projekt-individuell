// 'use client'
// import { useState } from "react";
// import { useAuth } from "../context/contextProvider";
// import { SearchForm } from "./forms/SearchForm";

// export const NavbarMobile = () => {
//     const { user, logout, modalOpen, toggleModal } = useAuth();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [searchFormVisible, setSearchFormVisible] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const toggleSearchForm = () => {
//         setSearchFormVisible(!searchFormVisible);
//     };

//     const [location, setLocation] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [guests, setGuests] = useState(1);

//     const handleSearch = () => {
//         console.log("Search initiated with:", { location, startDate, endDate, guests });
//     };

//     return (
//         <nav className="navbar-mobile">
//             <ul>
//                 {menuOpen ? (
//                     <li onClick={toggleSearchForm}>Close Search</li>
//                 ) : (
//                     <li onClick={toggleSearchForm}>
//                         <img src="/svg/Explore.svg" alt="Explorededed" />
//                     </li>
//                 )}
//                 {user ? (
//                     <li onClick={logout}>Log out</li>
//                 ) : (
//                     <li onClick={toggleModal}>
//                         <img src="/svg/login-mobile.svg" alt="Log in" />
//                     </li>
//                 )}
//             </ul>

//             {searchFormVisible && (
//                 <SearchForm
//                     location={location}
//                     startDate={startDate}
//                     endDate={endDate}
//                     guests={guests}
//                     onLocationChange={setLocation}
//                     onStartDateChange={setStartDate}
//                     onEndDateChange={setEndDate}
//                     onGuestsChange={setGuests}
//                     onSearch={handleSearch}
//                 />
//             )}
//         </nav>
//     );
// };


'use client';

import { useState } from "react";
import { SearchForm } from "./forms/SearchForm";
import { useAuth } from "../context/contextProvider";

interface NavbarMobileProps {
    location: string;
    startDate: string;
    endDate: string;
    guests: number;
    onLocationChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onGuestsChange: (value: number) => void;
    onSearch: () => void;
}

export const NavbarMobile = ({
    location,
    startDate,
    endDate,
    guests,
    onLocationChange,
    onStartDateChange,
    onEndDateChange,
    onGuestsChange,
    onSearch,
}: NavbarMobileProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchFormVisible, setSearchFormVisible] = useState(false);
    const { user, logout, toggleModal } = useAuth()

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleSearchForm = () => {
        setSearchFormVisible(!searchFormVisible);
    };

    return (
        <nav className="navbar-mobile">
            <ul>
                {menuOpen ? (
                    <li onClick={toggleSearchForm}>Close Search</li>
                ) : (
                    <li onClick={toggleSearchForm}>
                        <img src="/svg/Explore.svg" alt="Explore" />
                    </li>
                )}
                {user ? (
                     <li onClick={logout}>Log out</li>
                 ) : (
                     <li onClick={toggleModal}>
                         <img src="/svg/login-mobile.svg" alt="Log in" />
                     </li>
                 )}
            </ul>

            {searchFormVisible && (
                <SearchForm
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                    onLocationChange={onLocationChange}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                    onGuestsChange={onGuestsChange}
                    onSearch={onSearch}
                />
            )}
        </nav>
    );
};
