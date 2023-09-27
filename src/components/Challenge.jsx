"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsShare } from "react-icons/bs";
import { PiCopySimpleThin } from "react-icons/pi";
import toast from "react-hot-toast";

export default function Challenge({ quizId, userEmail, allUsers, details }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const linkText = `https://my-quiz-app-nine.vercel.app/?challenge=${quizId}&by=${userEmail}&difficulty=${
    details.difficulty
  }&type=${details.type}&amount=${details.amount}&category=${details.category}${
    details.grade ? `&grade=${details.grade}` : ""
  }`;

  function openModel() {
    setOpen(true);
  }
  function closeModel() {
    setOpen(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(linkText);
    toast.success("Text Coppied to Clipboard");
  }

  async function sendChallenge(id) {
    setSending(true);
    const data = {
      challengedToId: id,
      challengedById: userEmail,
      challengedQuiz: quizId,
      quizDetail: details,
    };
    const res = await fetch("/api/challenge", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(res.ok);
    if (res.ok) {
      toast.success("Challenge sent");

      setSending(false);
      closeModel();
    } else {
      setSending(false);
      closeModel();
      toast.error("Something Went Wrong!!!");
    }
  }
  return (
    <div className="">
      <button onClick={openModel}>
        <BsShare size={20} color="blue" />
      </button>
      {open && (
        <div className="absolute top-0 right-0 z-40 flex items-center justify-center w-full min-h-screen bg-black/40">
          <div className="relative flex items-center justify-center w-full h-full ">
            <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-lg boarder w-96 min-h-[400px]">
              <button
                onClick={closeModel}
                className="absolute w-8 h-8 bg-red-400 rounded-full -top-4 -right-4 "
              >
                X
              </button>
              <div className="text-2xl font-bold ">Challenge this Quiz to:</div>
              <p
                onClick={copyLink}
                className="relative w-full px-4 py-2 my-4 text-transparent break-words bg-gray-300 border-2 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-200 hover:text-black"
              >
                <span className="text-black">{linkText}</span>
                <PiCopySimpleThin
                  className="absolute top-2 right-2"
                  size={25}
                />
              </p>
              <div className="flex flex-col w-full h-full gap-2 p-2 border rounded-lg">
                {allUsers.map((u) => {
                  if (u.email == userEmail) {
                    return null;
                  }
                  return (
                    <button
                      className="flex items-center gap-2 p-2 hover:bg-gray-200"
                      disabled={sending}
                      onClick={() => sendChallenge(u.id)}
                    >
                      <Image
                        src={u.image}
                        alt="Picture of the author"
                        className="border rounded-full w-7 h-7 md:w-10 md:h-10 dark:border-zinc-600"
                        width={25}
                        height={25}
                      />
                      <div className="">
                        <div className="">{u.email}</div>
                        <div className="">{u.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
