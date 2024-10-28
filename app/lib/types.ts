// User type
export type User = {
    id?: string;
    userName: string;
    email?: string;
    displayName?: string;
    password?: string;
    bookings?: Booking[]; // Optional: User's booking history
}

// Equipment type for amenities in homes
export type Equipment = {
    doubleBed: boolean;
    bathroom: boolean;
    curtains: boolean;
    wifi: boolean;
    mirrors: boolean;
    hairdryer: boolean;
    iron: boolean;
    noSmoking: boolean;
    tv: boolean;
    wardrobe: boolean;
}


export type Homes = {
    id?: string;
    title: string;
    location: string;
    rating: number;
    description: string;
    images: string[];
    price: number;
    equipment: Equipment;
    bookings?: Booking[];
}

// Booking type to manage reservations
export type Booking = {
    bookingId?: string;
    homeId: string;
    userId: string;
    startDate: Date; 
    endDate: Date;
}


// export type User = {
//     id?: string;
//     userName: string;
//     email?: string;
//     displayName?: string;
//     password?: string;
// }

// export type Equipment = {
//     doubleBed: boolean,
//     bathroom: boolean,
//     curtains: boolean,
//     wifi: boolean,
//     mirrors: boolean,
//     hairdryer: boolean,
//     iron: boolean,
//     noSmoking: boolean,
//     tv: boolean,
//     wardrobe: boolean,
// }

// export type Homes = {
//     id?: string;
//     title: string;
//     rating: number;
//     description: string;
//     images: string[];
//     price: number;
//     isBooked: boolean;
//     equipment: Equipment;
// }