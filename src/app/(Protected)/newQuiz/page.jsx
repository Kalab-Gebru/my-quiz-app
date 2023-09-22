import { getServerSession } from "next-auth";
import services from "../../../lib/connect";
import NewQuiz from "../../../components/NewQuiz";
import { options } from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
export default async function page({ searchParams }) {
  const session = await getServerSession(options);

  const get = searchParams["get"] || false;
  const amount = searchParams["amount"] || 10;
  const category = searchParams["category"] || "any";
  const difficulty = searchParams["difficulty"] || "any";
  const type = searchParams["type"] || "any";

  const Details = {
    amount: amount,
    category: category,
    difficulty: difficulty,
    type: type,
    finished: false,
  };

  let newQuizid = undefined;

  if (get) {
    const param = `amount=${amount}${
      category != "any" ? `&category=${category}` : ""
    }${difficulty != "any" ? `&difficulty=${difficulty}` : ""}${
      type != "any" ? `&type=${type}` : ""
    }`;

    newQuizid = await services.getQuizs(session.user.id, param, Details);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {get ? (
        <div className="">
          {newQuizid ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-2xl">The New Quiz is Ready.</div>
              <Link
                href={`/takeQuiz/${newQuizid}`}
                className="px-4 py-2 text-white bg-green-400 rounded"
              >
                Take The Quiz
              </Link>
            </div>
          ) : (
            <Link
              className="px-4 py-2 text-white bg-blue-400 rounded"
              href={"/newQuiz"}
            >
              Try Link
            </Link>
          )}
        </div>
      ) : (
        <NewQuiz />
      )}
    </div>
  );
}
