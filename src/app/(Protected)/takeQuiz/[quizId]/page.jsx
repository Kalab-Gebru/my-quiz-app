import services from "../../../../lib/connect";
import CurrentQuiz from "../../../../components/CurrentQuiz";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";

export default async function page({ params, searchParams }) {
  const session = await getServerSession(options);

  const user = await services.getUserById(session.user.id);
  const exist = user?.quizs?.filter((q) => q.quizId == params.quizId);

  const completed = exist ? exist[0].details.finished : undefined;
  let quiz;
  if (exist && !completed) {
    quiz = await services.getQuizByID(params.quizId);
  }

  const path = `${params.quizId}`;
  let currentquiz;
  const answers = user?.answers?.filter((q) => q.quizId == params.quizId);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {quiz ? (
        <CurrentQuiz
          Quiz={quiz.results}
          quizId={path}
          userId={session.user.id}
          answers={answers[0].result}
        />
      ) : (
        <div className="">quiz not found</div>
      )}
    </div>
  );
}
