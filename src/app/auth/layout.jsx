export const metadata = {
  title: "Auth pages",
  description: "you need to get authenticated to use the app",
};

export default function Layout({ children }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
