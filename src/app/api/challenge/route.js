import services from "../../../lib/connect";

export const POST = async (request) => {
  const { challengedToId, challengedById, challengedQuiz, quizDetail } =
    await request.json();

  try {
    await services.setChallenge(
      challengedToId,
      challengedById,
      challengedQuiz,
      quizDetail
    );

    return new Response(JSON.stringify({ res: "challenge set" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to set challenge", { status: 500 });
  }
};
