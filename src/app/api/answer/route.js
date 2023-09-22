import services from "../../../lib/connect";

export const POST = async (request) => {
  const { userId, quizId, qNo, answer, finished } = await request.json();

  try {
    const user = await services.getUserById(userId);
    const oldAnswers = user.answers;
    let newResult;
    const newAnswers = oldAnswers.map((oa) => {
      if (oa.quizId == quizId) {
        newResult = oa.result;
        newResult[qNo] = answer;

        // newResult.splice(qNo, 0, answer);

        for (let i = 0; i < newResult.length; i++) {
          if (newResult[i] === undefined) {
            newResult[i] = "";
          }
        }

        return {
          quizId: quizId,
          result: newResult,
        };
      }
      return oa;
    });

    let newQuizes;
    if (finished) {
      const oldquizs = user.quizs;

      const grade = await services.getGrade(quizId, newResult);

      services.setGradeInQuiz(quizId, grade);

      newQuizes = oldquizs.map((oq) => {
        if (oq.quizId == quizId) {
          const newDetails = oq.details;
          newDetails.finished = true;
          newDetails.grade = grade;
          return {
            quizId: quizId,
            details: newDetails,
          };
        }
        return oq;
      });
    }

    await services.setAnswer(userId, newAnswers, newQuizes);

    return new Response(JSON.stringify({ res: "answer set" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
