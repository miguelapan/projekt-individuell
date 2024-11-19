'use client'
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    };

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [start, end] = dateRange;

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [startDate, endDate] = dates;
        setDateRange(dates);

        // Convert the start and end dates to ISO strings if they are not null
        onStartDateChange(startDate ? startDate.toISOString().split("T")[0] : "");
        onEndDateChange(endDate ? endDate.toISOString().split("T")[0] : "");
    };

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
                <label htmlFor="daterange">Välj datum</label>
                <DatePicker
                    id="daterange"
                    selected={start ?? undefined}
                    onChange={handleDateChange}
                    startDate={start ?? undefined}
                    endDate={end ?? undefined}
                    selectsRange
                    placeholderText="Välj datum"
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div className="input-search">
                <label htmlFor="antal">ANTAL BOENDE</label>
                <input
                    type="number"
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
