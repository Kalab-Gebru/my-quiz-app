import services from "../../../lib/connect";

export const POST = async (request) => {
  const { userId, quizId } = await request.json();

  try {
    const user = await services.getUserById(userId);
    const quiz = await services.getQuizByID(quizId);

    const answers = user.answers;
    const quizs = user.quizs;

    console.log(answers);
    const newAnswers = answers.filter((q) => q.quizId != quizId);
    const newQuiz = quizs.filter((q) => q.quizId != quizId);

    console.log(newAnswers);
    console.log(newQuiz);

    const newQuizid = await services.deleteQuiz(
      userId,
      quizId,
      quiz.noOfUsers,
      newAnswers,
      newQuiz
    );

    return new Response(JSON.stringify({ id: newQuizid }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to set challenge", { status: 500 });
  }
};
