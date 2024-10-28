import { NextResponse } from 'next/server';
import { getHomes, getOneHome } from '@/app/lib/homeUtils'; 
import { NextRequest } from 'next/server'; // Importing NextRequest for the request type


export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    const { id } = await params;
    if (id) {
      const home = await getOneHome(id);
      if (home) {
        return NextResponse.json(home);
      } else {
        return NextResponse.json({ error: "Home not found" }, { status: 404 });
      }
    } else {
      const homes = await getHomes();
      return NextResponse.json(homes);
    }
  } catch (error) {
    console.error("Error fetching homes data:", error);
    return NextResponse.json({ error: "Error fetching homes data" }, { status: 500 });
  }
}
