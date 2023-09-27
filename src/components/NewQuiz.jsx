"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

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

function NewQuiz({ userId }) {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState(Category[0]);
  const [difficulty, setDifficulty] = useState(Difficulty[0]);
  const [type, setType] = useState(Type[0]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const param = `amount=${amount}${
      category.value != "any" ? `&category=${category.value}` : ""
    }${difficulty.value != "any" ? `&difficulty=${difficulty.value}` : ""}${
      type.value != "any" ? `&type=${type.value}` : ""
    }`;

    const data = {
      userId: userId,
      param: param,
      Details: {
        amount: amount,
        category: category.value,
        difficulty: difficulty.value,
        type: type.value,
        finished: false,
      },
    };
    const res = await fetch("/api/createQuiz", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // console.log(amount);
    if (res.ok) {
      toast.success("Challenge sent");
      setLoading(false);
      const response = await res.json();
      console.log(response);
      router.push(`/takeQuiz/${response.id}`);
    } else {
      setLoading(false);
      toast.error("Something Went Wrong!!!");
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center w-full mt-24">
        <span className="circle animate-loader"></span>
        <span className="circle animate-loader animation-delay-200"></span>
        <span className="circle animate-loader animation-delay-400"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 border">
      <h1 className="text-2xl font-bold">Choose preference</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-between w-full gap-8 px-4 md:w-96"
      >
        <div className="flex flex-col w-full gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">No Of Questions:</h1>
            <div className="text-black">
              <input
                className="w-full h-10 px-4 border-2 rounded"
                type="number"
                id="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                name="amount"
                min={5}
                max={20}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">Catagory:</h1>
            <div className="text-black">
              <Select
                instanceId={1}
                defaultValue={category}
                onChange={setCategory}
                options={Category}
                // styles={colorstyle("200px")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">Difficulty:</h1>
            <div className="text-black">
              <Select
                instanceId={2}
                defaultValue={difficulty}
                onChange={setDifficulty}
                options={Difficulty}
                // styles={colorstyle("200px")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg">Type:</h1>
            <div className="text-black">
              <Select
                instanceId={3}
                defaultValue={type}
                onChange={setType}
                options={Type}
                // styles={colorstyle("200px")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 text-xl text-white bg-green-400 rounded"
        >
          Get Quiz
        </button>
      </form>
    </div>
  );
}

export default NewQuiz;
