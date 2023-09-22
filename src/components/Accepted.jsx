"use client";

import { useState } from "react";

export default function Accepted({ quizId, userId, details, accepted }) {
  const [acceptedS, setAcceptedS] = useState(false);
  const [sending, setSending] = useState(false);

  async function Accept() {
    setSending(true);
    const Qdetails = {
      amount: details.amount,
      category: details.category,
      difficulty: details.difficulty,
      finished: false,
      type: details.type,
    };
    const data = {
      userId: userId,
      quizId: quizId,
      quizDetail: Qdetails,
    };
    const res = await fetch("/api/acceptChallenge", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(res.ok);
    if (res.ok) {
      setSending(false);
      setAcceptedS(true);
    }
  }

  return (
    <button
      className={`px-4 py-2 ${
        accepted || acceptedS
          ? "bg-gray-300 text-black"
          : "bg-green-300 text-white"
      }  rounded`}
      disabled={acceptedS || accepted || sending}
      onClick={Accept}
    >
      {accepted || acceptedS ? "Accepted" : "Accept"}
    </button>
  );
}
