import React from "react";
import Signout from "./Signout";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center w-full px-4 py-4 shadow-sm bg-white/[97%]">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="text-3xl">
          <span className="text-green-300">Quiz</span>App
        </Link>
        <div className="flex items-center justify-center gap-8">
          <Link
            className="text-2xl border-b-2 border-green-300 "
            href={"/newQuiz"}
          >
            New Quiz
          </Link>
          {/* <div className="">{session?.user?.name}</div> */}
          <Link href={"/"}>
            <Image
              src={session.user.image}
              alt="Picture of the author"
              className="border rounded-full w-7 h-7 md:w-10 md:h-10 dark:border-zinc-600"
              width={25}
              height={25}
            />
          </Link>
          <Signout />
        </div>
      </div>
    </div>
  );
}
