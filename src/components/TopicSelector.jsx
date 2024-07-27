const TopicSelector = ({ setBigState }) => {
  const questionCounts = ["C++", "JavaScript", "Python", "Machine Learning"];

  return (
    <div className=" my-4 flex justify-center items-center ">
      <h2 className="text-2xl font-bold mb-2 text-white">Select Topics: </h2>
      {questionCounts.map((topic) => (
        <button
          key={topic}
          onClick={() =>
            setBigState((a) => ({
              ...structuredClone(a),
              topic: topic,
            }))
          }
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicSelector;
