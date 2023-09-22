import { getServerSession } from "next-auth";
import services from "../../lib/connect";
import { options } from "../api/auth/[...nextauth]/options";
import QuizCard from "../../components/QuizCard";
export default async function Home() {
  const session = await getServerSession(options);
  const data = await services.getUserById(session.user.id);
  const allUsers = await services.getAllUsers();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="container mt-8">
        <div className="text-2xl">User : {session.user.name}</div>
        <section className="mt-8">
          {data?.quizs && (
            <div className="flex flex-col gap-8">
              {data.quizs.filter((q) => !q.details.finished).length != 0 && (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full text-xl font-bold">
                    Unfinished Quizs
                  </div>
                  {data.quizs.map((q) => {
                    if (!q.details.finished) {
                      return (
                        <QuizCard
                          id={q.quizId}
                          data={q.details}
                          userId={session.user.id}
                          allUsers={allUsers}
                        />
                      );
                    }
                  })}
                </div>
              )}
              {data.quizs.filter((q) => q.details.finished).length != 0 && (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full text-xl font-bold">Finished Quizs</div>
                  {data.quizs.map((q) => {
                    if (q.details.finished) {
                      return (
                        <QuizCard
                          id={q.quizId}
                          data={q.details}
                          userId={session.user.id}
                          allUsers={allUsers}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
