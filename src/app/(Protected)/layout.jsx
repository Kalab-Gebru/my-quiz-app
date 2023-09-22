import Navbar from "../../components/Navbar";

export const metadata = {
  title: "create new quiz",
  description: "create new quiz by users choose",
};

export default async function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
