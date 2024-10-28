'use client'

import { useState } from "react";
import { uploadImage } from "@/app/lib/imageUtils";
import { createHome } from "@/app/lib/homeUtils";
import { Equipment, Homes } from "@/app/lib/types";

export const CreateHomeForm = () => {
  const defaultEquipment: Equipment = {
    doubleBed: false,
    bathroom: false,
    curtains: false,
    wifi: false,
    mirrors: false,
    hairdryer: false,
    iron: false,
    noSmoking: false,
    tv: false,
    wardrobe: false,
  };
  
  const [location, setLocation] = useState<string>("");
  const [equipment, setEquipment] = useState<Equipment>(defaultEquipment);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
   
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (imageFile) {
      const imageURL = await uploadImage(imageFile);
      if (imageURL) {
        await createHome(title, description, price, rating, imageURL, location, equipment);
        setMessage("Home created successfully");
      } else {
        console.error("Failed to upload image");
        setErrorMessage("Failed to upload image");
      }
    } else {
      console.error("No image file selected");
      setErrorMessage("No image file selected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <input type="file" onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setImageFile(e.target.files[0]);
        }
      }} required />
      <h2>Equipment</h2>

      {/* KOLLA IN  */}
      <ul>
        {Object.entries(equipment).map(([key, value]) => (
          <li key={key}>
            <label>
              <input type="checkbox" checked={value} onChange={(e) => {
                setEquipment((prev) => ({ ...prev, [key]: e.target.checked }));
              }} />
              {key}
            </label>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Create Home</button>
    </form>
  );
};
