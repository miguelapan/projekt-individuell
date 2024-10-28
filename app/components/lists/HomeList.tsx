// import { useAuth } from "@/app/context/contextProvider";
// import { useRouter } from "next/navigation";

// export const HomeList = () => {

//     const router = useRouter()

//     const { homeData } = useAuth()

//     const homeHandler = (id: string) => {
//         router.push(`/details/${id}`)
//     }

//     return (
//         <div className="home-list">
//             {homeData.map((home) => {
//                 return (
//                     <div className="home-container" onClick={() => home.id && homeHandler(home.id)} key={home.id}>
//                         <img src={home.images[0]} alt="" />
//                         <p>{home.description}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     );
// }

import { useRouter } from "next/navigation";
import { Homes } from "@/app/lib/types";

interface HomeListProps {
    filteredHomes: Homes[];
}

export const HomeList = ({ filteredHomes }: HomeListProps) => {
    const router = useRouter();

    const homeHandler = (id: string) => {
        router.push(`/details/${id}`);
    };

    return (
        <div className="home-list">
            {filteredHomes.map((home) => (
                <div className="home-container" onClick={() => home.id && homeHandler(home.id)} key={home.id}>
                    <img src={home.images[0]} alt={home.description} />
                    <p>{home.description}</p>
                </div>
            ))}
        </div>
    );
};
