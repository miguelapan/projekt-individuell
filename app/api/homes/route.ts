import { createHome, getHomes } from "@/app/lib/homeUtils";
import { Equipment } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const homes = await getHomes();
        return NextResponse.json(homes);
    }catch(error){
        console.error("Error fetching homes data:", error);
        return NextResponse.json({ error: "Error fetching homes data" }, { status: 500 });
    }
}


// KOLLA DENNA DEN KOMMER GARANTERAT INTE FUNKA, OCH INTE BEHÖVAS????
export async function POST(title: string, description: string, price: string, rating: string, imageURL: string, location: string, equipment: Equipment) {
    try{
        const homes = await createHome(title, description, price, rating, imageURL, location, equipment);
        return NextResponse.json(homes);
    }catch(error) {
        console.error("Error creating home:", error);
        return NextResponse.json({ error: "Error creating home" }, { status: 500 });
    }
}