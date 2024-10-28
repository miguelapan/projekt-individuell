import { getHomes } from "@/app/lib/homeUtils";
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
