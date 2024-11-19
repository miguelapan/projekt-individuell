
'use client'
import { useState } from "react";
import { uploadImage } from "@/app/lib/imageUtils";
import { createHome } from "@/app/lib/homeUtils";
import { Equipment } from "@/app/lib/types";

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
  const [capacity, setCapacity] = useState<number>(1);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Array of files
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (imageFiles.length > 0) {
      try {
        // Upload each image and collect URLs
        const imageUploadPromises = imageFiles.map((file) => uploadImage(file));
        const imageURLs = (await Promise.all(imageUploadPromises)).filter((url): url is string => url !== null);

        // Call createHome with multiple image URLs
        await createHome(
          title,
          description,
          price,
          rating,
          imageURLs, // Pass multiple image URLs
          location,
          equipment,
          capacity
        );
        setMessage("Home created successfully");
      } catch (error) {
        console.error("Failed to upload images:", error);
        setErrorMessage("Failed to upload images");
      }
    } else {
      console.error("No image files selected");
      setErrorMessage("No image files selected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} required />
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImageFiles(Array.from(e.target.files)); // Convert FileList to an array
          }
        }}
        required
      />
      <h2>Equipment</h2>
      <ul>
        {Object.entries(equipment).map(([key, value]) => (
          <li key={key}>
            <label>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => {
                  setEquipment((prev) => ({ ...prev, [key]: e.target.checked }));
                }}
              />
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


