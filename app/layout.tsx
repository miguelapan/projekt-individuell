import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/styles.css"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/contextProvider";

const inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",  
  variable: "--font-inter",
  weight: "100 900",  
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`grid-template  ${inter.variable}`}>
        <AuthProvider>
        <Header />
        <main>
        {children}
        </main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
