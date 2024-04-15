import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AS calling",
  description: "Video Calling App!",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsPlacement: "top",
            logoImageUrl: "/icons/logo.svg",
            socialButtonsVariant: "iconButton",
            logoPlacement: "inside",
          },
          variables: {
            colorInputBackground: "#578e9b",
            colorInputText: "#fff",
          },
        }}
      >
        <body
          className={`${inter.className} bg-gradient-to-r from-blue-700 via-purple-600 to-green-500`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
