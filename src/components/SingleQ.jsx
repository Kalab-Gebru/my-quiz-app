"use client";

export default function SingleQ({ Currentq, userA, correctA }) {
  let txt = document.createElement("textarea");
  function decode(str) {
    txt.innerHTML = str;
    return txt.value;
  }

  return (
    <div className="flex flex-col w-full mt-8 md:max-w-3xl">
      <div className="flex items-start text-2xl">
        <span>{Currentq.qno}. </span>
        <div className="">{decode(Currentq.question)}</div>
      </div>

      <div className="flex flex-col gap-2 px-4 my-8">
        {Currentq.answers.map((q, i) => (
          <div
            className={`h-12 p-2 border rounded-lg ${
              correctA == q && userA == q ? "bg-green-400" : ""
            } ${correctA != q && userA == q ? "bg-red-400" : ""} ${
              correctA == q && userA != q ? "bg-yellow-400" : ""
            }`}
          >
            {decode(q)}
          </div>
        ))}
      </div>
    </div>
  );
}
