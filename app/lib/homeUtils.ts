import { db } from "@/firebase/config";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Equipment, Homes } from "./types";


export const getHomes = async (): Promise<Homes[]> => {
  const docRef = collection(db, "homes");
  const docSnap = await getDocs(docRef);

    const homes = docSnap.docs.map((doc) => {
      const home = { id: doc.id, ...doc.data() as Homes };
        return home
        });

        return homes;
};

export const getOneHome = async (id: string): Promise<Homes | null> => {
  const docRef = doc(db, "homes", id);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
        const home = { id: docSnap.id, ...docSnap.data() as Homes };
        return home;
    }else{
      return null;
    }
}

// KOLLA  HÄR
export const createHome = async (
  title: string, 
  description: string, 
  price: string, 
  rating: string, 
  imageURL: string, 
  location: string,
  equipment: Equipment
): Promise<Homes | null> => {

  const homeData: Homes = { 
    title, 
    description, 
    price: parseFloat(price), 
    rating: parseFloat(rating),
    images: [imageURL],  // FIXA BARA E NBLD JUST NU
    location, 
    equipment
  };

  try {
    await addDoc(collection(db, "homes"), homeData);
    return homeData;
  } catch (error) {
    console.error("Error creating home:", error);
    return null;
  }
};
