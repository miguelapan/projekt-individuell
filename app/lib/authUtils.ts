import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { User } from "./types";

// Fetch User Profile
export const fetchUserProfile = async (uid: string): Promise<User | null> => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return {
            id: userDocSnap.id,
            userName: userData.userName,
            email: userData.email,
            displayName: userData.displayName,
        } as User;
    } else {
        return null;
    }
};

// Login Function
export const login = async (email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const userProfile = await fetchUserProfile(userCredentials.user.uid);
    return userProfile;
};

// Logout Function
export const logout = async () => {
    await signOut(auth);
};

// Create Profile Function
export const createProfile = async (email: string, password: string, userName: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const userRef = doc(db, 'users', userCredentials.user.uid);
    await setDoc(userRef, {
        email: email,
        userName: userName,
    });

    const newUserProfile = await fetchUserProfile(userCredentials.user.uid);
    return newUserProfile;
};
