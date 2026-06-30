import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Young Man",
  description: "Its create for making a drags less young community",

};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-theme="dark"
    >
    
     
      <body className="bg-background text-foreground">
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
          <Toaster />
        </footer>
      </body>
    </html>
  );
}
