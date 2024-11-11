'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Homes, User } from "../lib/types";
import { fetchUserProfile, login as loginUser, logout as logoutUser, createProfile as createUserProfile } from "../lib/authUtils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

interface AuthContextType {
  homeData: Homes[];
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createProfile: (email: string, password: string, userName: string) => Promise<void>;
  fetchHomeById: (id: string) => Promise<Homes | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [homeData, setHomeData] = useState<Homes[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await fetchUserProfile(user.uid);
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch homes data

  useEffect(() => {
    const fetchHomesData = async () => {
      try{
        const response = await fetch("/api/homes");
      const data = await response.json();
      setHomeData(data);
    }catch(error){
      console.error("Fetch Homes Error:", error);
      throw error;
    }
  }
  fetchHomesData();
}, []);

// fetch home by id 

const fetchHomeById = async (id: string): Promise<Homes | null> => {
  try{ 
    const response = await fetch(`/api/homes/${id}`);
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Fetch Home by ID Error:", error);
    return null;
  }
}

  // Login method
  const login = async (email: string, password: string) => {
    try {
      const userProfile = await loginUser(email, password);
      setUser(userProfile);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // Create profile
  const createProfile = async (email: string, password: string, userName: string) => {
    try {
      const newUserProfile = await createUserProfile(email, password, userName);
      setUser(newUserProfile);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ homeData, user, loading, login, logout, createProfile, fetchHomeById }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
