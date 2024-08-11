"use client";
import "../globals.css";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Admin Panel</title>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToastContainer position="top-right" autoClose={2000} theme="light" />
        {children}
      </body>
    </html>
  );
}
