// import { db } from "@/firebase/config";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { Homes } from "./types";

// export const getHomes = async (): Promise<Homes[]> => {
//   const docRef = collection(db, "homes");
//   const docSnap = await getDocs(docRef);

//     const users = docSnap.docs.map((doc) => {
//       const homes = { id: doc.id, ...doc.data() as Homes };
//         return homes
//         });

//         return users;
// };

// export const createHome = async (newHome: Homes) => {
//     const docRef = await addDoc(collection(db, "homes"), newHome);

//     return docRef.id;
// }

