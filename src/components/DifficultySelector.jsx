import { useEffect } from "react";

const DifficultySelector = ({ setBigState }) => {
  const difficulties = ["Easy", "Medium", "Hard", "Difficult"];
  const questionCounts = ["C++", "JavaScript", "Python", "Java"];
  const counts = [5, 10, 15, 20, 25, 30];
  // const difficulties = ["Easy", "Medium", "Hard", "Difficult"];

  return (
    <div className=" my-4 flex flex-col  ">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Select Difficulty:
        </h2>{" "}
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() =>
              setBigState((prev) => ({
                ...structuredClone(prev),
                difficulty: level,
              }))
            }
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
          >
            {level}
          </button>
        ))}
      </div>

      <div className="flex items-center">
        <h2 className="text-2xl font-bold mb-2 text-white">Select Topics:</h2>{" "}
        {questionCounts.map((level) => (
          <button
            key={level}
            onClick={() =>
              setBigState((prev) => ({
                ...structuredClone(prev),
                topic: level,
              }))
            }
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
          >
            {level}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mb-2 text-white">Total Question:</h2>{" "}
        {counts.map((level) => (
          <button
            key={level}
            onClick={() =>
              setBigState((prev) => ({
                ...structuredClone(prev),
                questionCount: level,
              }))
            }
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;

/* {difficulties.map((level) => (
        <button
          key={level}
          onClick={() =>
            setBigState((prev) => ({
              ...structuredClone(prev),
              difficulty: level,
            }))
          }
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
        >
          {level}
        </button>
      ))} */
