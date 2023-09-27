import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "create new quiz",
  description: "create new quiz by users choose",
};

export default async function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
