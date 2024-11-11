import { db } from "@/firebase/config";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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
  equipment: Equipment,
  capacity: number
): Promise<Homes | null> => {

  const homeData: Homes = { 
    title, 
    description, 
    price: parseFloat(price), 
    rating: parseFloat(rating),
    images: [imageURL],  // FIXA BARA E NBLD JUST NU
    location, 
    equipment,
    capacity,
  };

  try {
    await addDoc(collection(db, "homes"), homeData);
    return homeData;
  } catch (error) {
    console.error("Error creating home:", error);
    return null;
  }
};


// BOKNING TEST 


import { Booking } from "./types";

/**
 * Adds a new booking to a home and user in Firestore
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
//  * KOLLA DETTA 
 * @param booking - Booking details to add
 * @returns Promise<void>
 */
export const addBooking = async (booking: Booking): Promise<void> => {
    const homeRef = doc(db, "homes", booking.homeId);
    const userRef = doc(db, "users", booking.userId);

    try {
        // Update the home document to add the new booking
        await updateDoc(homeRef, {
            bookings: arrayUnion(booking),
        });

        // Optionally, update the user document to add the booking reference
        await updateDoc(userRef, {
            bookings: arrayUnion(booking),
        });

        console.log("Booking successfully added");
    } catch (error) {
        console.error("Error adding booking:", error);
    }
};