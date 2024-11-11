import { FormEvent } from "react";

interface SearchFormProps {
    location: string;
    guests: number;
    startDate: string;
    endDate: string;
    onLocationChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onGuestsChange: (value: number) => void;
    onSearch: () => void;
}

export const SearchForm = ({
    location,
    startDate,
    endDate,
    guests,
    onLocationChange,
    onStartDateChange,
    onEndDateChange,
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
                <label htmlFor="startDatum">Välj startdatum</label>
                <input
                    type="date"  
                    id="startDatum"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </div>
            <div className="input-search">
                <label htmlFor="endDatum">Välj slutdatum</label>
                <input
                    type="date"
                    id="endDatum"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </div>

            <div className="input-search">
                <label htmlFor="antal">ANTAL BOENDE</label>
                <input
                    type="text"
                    placeholder="ANTAL BOENDE"
                    id="antal"
                    value={guests}
                    onChange={(e) => onGuestsChange(Number(e.target.value))}
                />
            </div>
            <button className="search-button" type="submit">SÖK</button>
        </form>
    );
};
