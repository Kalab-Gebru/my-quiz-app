"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsShare } from "react-icons/bs";

export default function Challenge({ quizId, userEmail, allUsers, details }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  function openModel() {
    setOpen(true);
  }
  function closeModel() {
    setOpen(false);
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
      setSending(false);
      closeModel();
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
            <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded boarder w-96 max-h-96">
              <button
                onClick={closeModel}
                className="absolute w-8 h-8 bg-red-400 rounded-full -top-4 -right-4 "
              >
                X
              </button>
              <div className="mb-4 text-2xl font-bold">
                Challenge this Quiz to:
              </div>
              <div className="flex flex-col w-full h-full gap-2 p-2 border rounded">
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
