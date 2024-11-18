


import localFont from "next/font/local";
import "./globals.css";
// import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest:"/manifest.json",
};

export default function RootLayout({ children }) {
  // React.useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     console.log("true man")
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered with scope:", registration.scope);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  // }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
