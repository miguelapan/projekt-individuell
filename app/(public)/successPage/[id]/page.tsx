'use client'

import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const { fetchHomeById } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [home, setHome] = useState<Homes | null>(null);

    useEffect(() => {
        const fetchHome = async () => {
            // KOLLA ÖVER DETTA 
            const id = Array.isArray(params?.id) ? params.id[0] : params?.id; 
            // KOLLA ÖVER DETTA 
            if (id) {
                const home = await fetchHomeById(id);
                setHome(home);
            }
        };
        fetchHome();

        const timeout = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timeout); 
        
    }, [params.id, fetchHomeById, router]);

    return (
        <div className="success-page">
            {home && <img src={home.images[0]} alt="hero" />}
            <h1>Bokning genomförd!</h1>
            <p>Du blir automatiskt skickad till startsidan</p>
        </div>
    );
}
