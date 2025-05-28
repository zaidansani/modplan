import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModplanProvider } from '@/app/contexts/ModplanContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "modplan",
  description: "by @zaidansani",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen grid grid-rows-[1fr_auto] 
        bg-linear-to-l from-stone-400 to-gray-300`}>
            <main className="container mx-auto max-w-8/10 px-4 py-8 w-full flex flex-col gap-8">
                <ModplanProvider>
                    {children}
                </ModplanProvider>
            </main>

            <footer className="bg-background border-t py-4 mt-8">
                <div className="container mx-auto max-w-4xl px-4 text-center text-sm text-muted-foreground">
                    designed and created by @zaidansani.
                </div>
            </footer>
        </body>
        </html>
    );
}

