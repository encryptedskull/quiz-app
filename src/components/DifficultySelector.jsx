const DifficultySelector = ({ setBigState }) => {
  const difficulties = ["Easy", "Medium", "Hard", "Difficult"];

  return (
    <div className=" my-4 flex justify-center items-center ">
      <h2 className="text-2xl font-bold mb-2 text-white">Select Difficulty:</h2>
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
  );
};

export default DifficultySelector;
