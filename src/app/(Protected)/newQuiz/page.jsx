import { getServerSession } from "next-auth";
import NewQuiz from "../../../components/NewQuiz";
import { options } from "../../api/auth/[...nextauth]/options";
export default async function page() {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <NewQuiz userId={session.user.id} />
    </div>
  );
}
