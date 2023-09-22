import "../styles/globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "../context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz App",
  description: "take quiz to test your knowledge on deferent catagoryies",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
