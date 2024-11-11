
import { useRouter } from "next/navigation";
import { Homes } from "@/app/lib/types";

interface HomeListProps {
    filteredHomes: Homes[];
    startDate: string;
    endDate: string;
    guests: number;
}

export const HomeList = ({ filteredHomes, startDate, endDate, guests }: HomeListProps) => {
    const router = useRouter();

    const homeHandler = (id: string) => {
        const queryParams = new URLSearchParams({
            startDate,
            endDate,
            guests: guests.toString(),
        }).toString();
        const url = `/details/${id}?${queryParams}`;

        router.push(url);
    };

    return (
        <div className="home-list">
            {filteredHomes ? filteredHomes.map((home) => (
                <button className="home-container" onClick={() => home.id && homeHandler(home.id)} key={home.id}>
                    <img src={home.images[0]} alt={home.description} />
                    <p>{home.description}</p>
                </button>
            )) : <p>No homes found</p>}
        </div>
    );
};
