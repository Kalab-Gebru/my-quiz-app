import services from "../../../lib/connect";

export const POST = async (request) => {
  const { userId, param, Details } = await request.json();
  console.log(param);
  try {
    const newQuizid = await services.setQuizs(userId, param, Details);

    if (newQuizid) {
      return new Response(JSON.stringify({ id: newQuizid }), {
        status: 200,
      });
    } else {
      throw Error;
    }
  } catch (error) {
    return new Response("Failed to set challenge", { status: 500 });
  }
};
