import { getServerSession } from "next-auth";
import services from "../../../../lib/connect";
import { options } from "../../../api/auth/[...nextauth]/options";
import SingleQ from "../../../../components/SingleQ";

export default async function page({ params }) {
  const session = await getServerSession(options);
  const user = await services.getUserById(session.user.id);

  const exist = user?.quizs?.filter((q) => q.quizId == params.quizId);
  const completed = exist[0].details.finished;

  if (!exist) {
    return <div className="">quiz not found</div>;
  } else if (exist && !completed) {
    return <div className="">quiz not completed</div>;
  }

  const grade = exist[0].details.grade;

  const quiz = await services.getQuizByID(params.quizId);
  const answers = await services.getAnswersByID(session.user.id, params.quizId);
  // const grade= await services.getgrades(session.user.id,params.quizId);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-8">
      {quiz ? (
        <div className="h-full w-fit">
          <h1 className="mb-8 text-3xl ">
            Results:{" "}
            <span className="p-1 underline bg-gray-400 rounded">{`${grade}/${quiz.results.length}`}</span>
          </h1>
          {quiz.results.map((q, i) => {
            return (
              <SingleQ
                Currentq={q}
                userA={answers[i]}
                correctA={q.correct_answer}
              />
            );
          })}
        </div>
      ) : (
        <div className="">quiz not found</div>
      )}
    </div>
  );
}
