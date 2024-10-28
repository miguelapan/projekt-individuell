import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config"; 

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `homes/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL; 
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};
