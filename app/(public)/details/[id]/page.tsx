'use client';

import { useAuth } from "@/app/context/contextProvider";
import { Homes } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/app/hooks/isMobile";
import DetailPageContent from "@/app/components/sub/DetailPageDesktop";
import DetailPageMobile from "@/app/components/sub/DetailPageMobile";

export default function DetailPage({ params }: { readonly params: { id: string } }) {
    const { fetchHomeById } = useAuth();
    const [home, setHome] = useState<Homes | null>(null);
    const isMobile = useIsMobile(); 

    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const guests = searchParams.get("guests");

    useEffect(() => {
        const fetchHome = async () => {
            const { id } = await params;
            if (id) {
                const home = await fetchHomeById(id);
                setHome(home);
            }
        };
        fetchHome();
    }, [params, fetchHomeById]);

    return (
        <>
            {isMobile ? (
                <DetailPageMobile 
                    home={home}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                />
            ) : (
                <DetailPageContent
                    home={home}
                    startDate={startDate}
                    endDate={endDate}
                    guests={guests}
                />
            )}
        </>
    );
}
