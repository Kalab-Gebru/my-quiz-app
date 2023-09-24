"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CurrentQuiz({ Quiz, quizId, userId, answers }) {
  const [currentAnswer, setCurrentAnswer] = useState();
  const [allAnswer, setAllAnswer] = useState(answers);
  const [currentQuestion, setCurrentQuestion] = useState(answers.length);
  const router = useRouter();

  let txt = document.createElement("textarea");
  function decode(str) {
    txt.innerHTML = str;
    return txt.value;
  }

  async function nextQ() {
    const data = {
      userId: userId,
      quizId: quizId,
      qNo: currentQuestion,
      answer: currentAnswer,
      finished: false,
    };
    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response.ans);
      setAllAnswer(response.ans);
      setCurrentQuestion((pre) => pre + 1);
    }
  }

  function selectAnswer(value) {
    setCurrentAnswer(value);
  }

  async function submit() {
    const data = {
      userId: userId,
      quizId: quizId,
      qNo: currentQuestion,
      answer: currentAnswer,
      finished: true,
    };
    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/quizResults/${quizId}`);
    }
  }

  function getQ(i) {
    setCurrentQuestion(i);
  }

  return (
    <div className="flex flex-col w-full mt-8 md:max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-8">
        {Quiz.map((b, i) => {
          return (
            <button
              className={`px-2 py-1 border-2 rounded ${
                allAnswer[i] ? "bg-yellow-200" : ""
              } ${currentQuestion == i ? "border-green-400" : ""}`}
              onClick={() => getQ(i)}
            >
              Q{i + 1}
            </button>
          );
        })}
      </div>
      <div className="flex items-start text-2xl">
        <span>{Quiz[currentQuestion].qno}. </span>
        <div className="">{decode(Quiz[currentQuestion].question)}</div>
      </div>

      <div className="flex flex-col gap-2 px-4 my-8">
        {Quiz[currentQuestion].answers.map((q) => (
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
        {Quiz.length == currentQuestion + 1 ? (
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
