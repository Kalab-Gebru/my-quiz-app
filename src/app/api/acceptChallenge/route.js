import services from "../../../lib/connect";

export const POST = async (request) => {
  const { userId, quizId, quizDetail } = await request.json();

  try {
    await services.acceptQuizs(userId, quizId, quizDetail);

    return new Response(JSON.stringify({ res: "challenge Accepted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to set challenge", { status: 500 });
  }
};
