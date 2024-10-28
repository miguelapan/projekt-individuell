// export const SearchForm = () => {
//     return (
//         <form className="search-form">
//             <h3>Hitta boenden på cool</h3>
//             <p>Upptäck hela boenden eller hyr in dig på ett rum</p>
//             <div className="input-search">
//             <label htmlFor="plats">PLATS</label>
//             <input type="text" placeholder="Vart som helst" id="plats" />
//             </div>
//             <div className="input-search">
//             <label htmlFor="datum">Välj datum</label>
//             <input id="datum" type="text" placeholder="DATUM" />
//             </div>
//             <div className="input-search">
//             <label htmlFor="antal">ANTAL BOENDE</label>
//             <input id="antal" type="text" placeholder="ANTAL BOENDE" />
//             </div>
//             <button className="search-button" type="submit">SÖK</button>
//         </form>
//     );
// }

import { FormEvent } from "react";

interface SearchFormProps {
    location: string;
    date: string;
    guests: string;
    onLocationChange: (value: string) => void;
    onDateChange: (value: string) => void;
    onGuestsChange: (value: string) => void;
    onSearch: () => void;
}

export const SearchForm = ({
    location,
    date,
    guests,
    onLocationChange,
    onDateChange,
    onGuestsChange,
    onSearch
}: SearchFormProps) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch();
    }
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h3>Hitta boenden på cool</h3>
            <p>Upptäck hela boenden eller hyr in dig på ett rum</p>
            <div className="input-search">
                <label htmlFor="plats">PLATS</label>
                <input
                    type="text"
                    placeholder="Vart som helst"
                    id="plats"
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                />
            </div>
            <div className="input-search">
                <label htmlFor="datum">Välj datum</label>
                <input
                    type="text"
                    placeholder="DATUM"
                    id="datum"
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                />
            </div>
            <div className="input-search">
                <label htmlFor="antal">ANTAL BOENDE</label>
                <input
                    type="text"
                    placeholder="ANTAL BOENDE"
                    id="antal"
                    value={guests}
                    onChange={(e) => onGuestsChange(e.target.value)}
                />
            </div>
            <button className="search-button" type="submit">SÖK</button>
        </form>
    );
};
