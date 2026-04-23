import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "~/components/providers/AuthProvider";
import { ProfileGate } from "~/components/auth/ProfileGate";

export const metadata: Metadata = {
  title: "VitalPlus Health | Plataforma de Gestión de Salud",
  description: "Ecosistema integral de salud digital.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Quantum Portal",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable}`}>
      <body>
        <AuthProvider>
          <TRPCReactProvider>
            <ProfileGate>
              {children}
            </ProfileGate>
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
