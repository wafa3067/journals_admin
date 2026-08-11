import { AlertProvider } from "./components/AlertProvider";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <StoreProvider>
          <AlertProvider>{children}</AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
