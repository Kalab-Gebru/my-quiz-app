import Link from "next/link";

export default async function QuizCard({ id, data, userId, allUsers }) {
  const Category = [
    { value: "any", label: "Any Category" },
    { value: 9, label: "General Knowledge" },
    { value: 10, label: "Entertainment: Books" },
    { value: 11, label: "Entertainment: Film" },
    { value: 12, label: "Entertainment: Music" },
    { value: 13, label: "Entertainment: Musicals & Theatres" },
    { value: 14, label: "Entertainment: Television" },
    { value: 15, label: "Entertainment: Video Games" },
    { value: 16, label: "Entertainment: Board Games" },
    { value: 17, label: "Science & Nature" },
    { value: 18, label: "Science: Computers" },
    { value: 19, label: "Science: Mathematics" },
    { value: 20, label: "Mythology" },
    { value: 21, label: "Sports" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 24, label: "Politics" },
    { value: 25, label: "Art" },
    { value: 26, label: "Celebrities" },
    { value: 27, label: "Animals" },
    { value: 28, label: "Vehicles" },
    { value: 29, label: "Entertainment: Comics" },
    { value: 30, label: "Science: Gadgets" },
    { value: 31, label: "Entertainment: Japanese Anime & Manga" },
    { value: 32, label: "Entertainment: Cartoon & Animations" },
  ];

  const Difficulty = [
    { value: "any", label: "Any Difficulty" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const Type = [
    { value: "any", label: "Any Type" },
    { value: "multiple", label: "Multiple Choose" },
    { value: "boolean", label: "True/False" },
  ];
  const dataCategory = Category.filter((d) => d.value == data.category);
  const dataDifficulty = Difficulty.filter((d) => d.value == data.difficulty);
  const dataType = Type.filter((d) => d.value == data.type);

  return (
    <div
      className={`w-full max-w-md border-2 rounded-xl relative overflow-hidden`}
    >
      <Link
        href={data.finished ? `quizResults/${id}` : `takeQuiz/${id}`}
        className="flex flex-col gap-2 p-6"
      >
        {data.finished && (
          <div className="absolute top-0 right-0 px-2 py-1 text-sm bg-green-400">
            Finished
          </div>
        )}
        <div className="">
          <span className="px-1 bg-gray-200 rounded">Catagry type:</span>{" "}
          {dataCategory[0].label}
        </div>
        <div className="">
          <span className="px-1 bg-gray-200 rounded">Difficulty:</span>{" "}
          {dataDifficulty[0].label}
        </div>
        <div className="">
          <span className="px-1 bg-gray-200 rounded">Type:</span>{" "}
          {dataType[0].label}
        </div>
        <div className="">
          <span className="px-1 bg-gray-200 rounded">No of Qeustions:</span>{" "}
          {data.amount}
        </div>
        <div className="">
          <span className="px-1 bg-gray-200 rounded">Result:</span>{" "}
          {data.finished ? `${data.grade}/${data.amount}` : "not finished"}
        </div>
      </Link>
    </div>
  );
}
