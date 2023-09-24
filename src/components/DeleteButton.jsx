"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ userId, quizId }) {
  const router = useRouter();

  async function deletefun() {
    const data = {
      userId: userId,
      quizId: quizId,
    };

    const res = await fetch("/api/deleteQuiz", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.reload(true);
    }
  }
  return (
    <button onClick={deletefun} className="px-2 py-1 text-sm bg-red-300">
      Delete
    </button>
  );
}
