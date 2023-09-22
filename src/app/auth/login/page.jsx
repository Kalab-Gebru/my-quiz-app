import SignInButton from "../../../components/SignInButton";

function page() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="mb-4 text-6xl">Quiz App</div>
      <div className="mb-2 text-2xl">You need to login to use the app</div>
      <SignInButton />
    </div>
  );
}

export default page;
