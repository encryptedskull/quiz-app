const QuestionCountSelector = ({ setBigState }) => {
  const counts = [5, 10, 15, 20, 25, 30];

  return (
    <div className="my-4 flex justify-center items-center ">
      <h2 className="text-2xl font-bold mb-2 text-white">
        Numbers of Questions:
      </h2>
      {counts.map((count) => (
        <button
          key={count}
          onClick={() =>
            setBigState((prev) => ({
              ...structuredClone(prev),
              questionCount: count,
            }))
          }
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
        >
          {count}
        </button>
      ))}
    </div>
  );
};

export default QuestionCountSelector;
