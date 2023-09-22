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
  const answers = user.answers.filter((q) => q.quizId == params.quizId);

  const qNo = searchParams["qNo"] || answers[0].result.length + 1;

  if (quiz) {
    function formatQuiz(q) {
      const options = q.incorrect_answers;

      options.splice(
        ((options.length + 1) * Math.random()) | 0,
        0,
        q.correct_answer
      );

      currentquiz = {
        qno: qNo,
        type: q.type,
        answers: options,
        question: q.question,
        difficulty: q.difficulty,
        category: q.category,
      };
    }

    formatQuiz(quiz.results[qNo - 1]);
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      {quiz ? (
        <CurrentQuiz
          Quiz={currentquiz}
          path={path}
          lastq={qNo == quiz.results.length}
          userId={session.user.id}
          answers={answers[0].result}
          amount={quiz.results.length}
        />
      ) : (
        <div className="">quiz not found</div>
      )}
    </div>
  );
}
