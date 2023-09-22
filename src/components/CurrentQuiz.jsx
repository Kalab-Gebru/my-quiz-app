"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CurrentQuiz({
  path,
  Quiz,
  lastq,
  userId,
  answers,
  amount,
}) {
  const [currentAnswer, setCurrentAnswer] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCurrentAnswer(answers[Quiz.qno - 1] ? answers[Quiz.qno - 1] : undefined);
    setLoading(false);
  }, [Quiz]);

  let txt = document.createElement("textarea");
  function decode(str) {
    txt.innerHTML = str;
    return txt.value;
  }

  async function nextQ() {
    setLoading(true);
    const data = {
      userId: userId,
      quizId: path,
      qNo: Number(Quiz.qno) - 1,
      answer: currentAnswer,
      finished: false,
    };
    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`${path}?qNo=${Number(Quiz.qno) + 1}`);
    }
  }

  function selectAnswer(index) {
    setCurrentAnswer(index);
  }

  async function submit() {
    setLoading(true);
    const data = {
      userId: userId,
      quizId: path,
      qNo: Number(Quiz.qno) - 1,
      answer: currentAnswer,
      finished: true,
    };
    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/quizResults/${path}`);
    }
  }

  function getQ(i) {
    router.push(`${path}?qNo=${i + 1}`);
  }
  if (loading) {
    return <div className="flex justify-center w-full mt-24">loading...</div>;
  }

  return (
    <div className="flex flex-col w-full mt-8 md:max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: amount }).map((b, i) => {
          return (
            <button
              className={`px-2 py-1 border-2 rounded ${
                answers[i] ? "bg-yellow-200" : ""
              } ${Number(Quiz.qno) - 1 == i ? "border-green-400" : ""}`}
              onClick={() => getQ(i)}
            >
              Q{i + 1}
            </button>
          );
        })}
      </div>
      <div className="flex items-start text-2xl">
        <span>{Quiz.qno}. </span>
        <div className="">{decode(Quiz.question)}</div>
      </div>

      <div className="flex flex-col gap-2 px-4 my-8">
        {Quiz.answers.map((q, i) => (
          <button
            onClick={() => selectAnswer(q)}
            className={`h-12 p-2 border rounded-lg ${
              currentAnswer == q ? "bg-green-400 text-white" : ""
            }`}
          >
            {decode(q)}
          </button>
        ))}
      </div>
      <div className="flex justify-end w-full">
        {lastq ? (
          <button
            className="px-6 py-2 text-white uppercase bg-blue-500 rounded"
            onClick={submit}
          >
            Finish
          </button>
        ) : (
          <button
            className="px-6 py-2 text-white uppercase bg-blue-500 rounded"
            onClick={nextQ}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}
