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
        <section className="flex flex-col gap-8 mt-8">
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
                          quizId={q.quizId}
                          data={q.details}
                          userEmail={session.user.email}
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
                          quizId={q.quizId}
                          data={q.details}
                          userEmail={session.user.email}
                          allUsers={allUsers}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )}
          {data.challenge && (
            <div className="flex flex-wrap gap-4">
              <div className="w-full text-xl font-bold">Challenged Quizs</div>
              {data.challenge?.map((q) => {
                return (
                  <QuizCard
                    quizId={q.quizId}
                    data={q.details}
                    userEmail={session.user.email}
                    userId={session.user.id}
                    allUsers={allUsers}
                    ChallengedBy={q.by}
                    accepted={q.accepted}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
