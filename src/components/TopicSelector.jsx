import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const TopicSelector = ({ setBigState }) => {
  const questionArry = ["C++", "JavaScript", "Python", "Machine Learning"];
  const difficulties = ["Easy", "Medium", "Hard", "Difficult"];
  const counts = [5, 10, 15, 20, 25, 30];

  // State variables for dropdowns
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isCountOpen, setIsCountOpen] = useState(false);

  // State variables for selected values
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);

  return (
    <div className="my-4 flex gap-10 items-center">
      {/* Topic Dropdown */}
      <div className="my-2 w-full">
        <button
          onClick={() => setIsTopicOpen((prev) => !prev)}
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded flex"
        >
          {selectedTopic ? `${selectedTopic}` : "Select Topic"}{" "}
          {isTopicOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {isTopicOpen && (
          <div className="bg-white shadow-md rounded p-4 mt-2">
            {questionArry.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedTopic(item);
                  setBigState((a) => ({
                    ...structuredClone(a),
                    topic: item,
                  }));
                  setIsTopicOpen(false);
                }}
                className="block text-left w-full py-2 px-4 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Difficulty Dropdown */}
      <div className="my-2 w-full">
        <button
          onClick={() => setIsDifficultyOpen((prev) => !prev)}
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
        >
          {selectedDifficulty ? `${selectedDifficulty}` : "Select Difficulty"}{" "}
          {isDifficultyOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {isDifficultyOpen && (
          <div className="bg-white shadow-md rounded p-4 mt-2">
            {difficulties.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedDifficulty(item);
                  setBigState((a) => ({
                    ...structuredClone(a),
                    difficulty: item,
                  }));
                  setIsDifficultyOpen(false);
                }}
                className="block text-left w-full py-2 px-4 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Question Count Dropdown */}
      <div className="my-2 w-full">
        <button
          onClick={() => setIsCountOpen((prev) => !prev)}
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
        >
          {selectedCount ? `${selectedCount}` : "Total Questions"}{" "}
          {isCountOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {isCountOpen && (
          <div className="bg-white shadow-md rounded p-4 mt-2">
            {counts.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedCount(item);
                  setBigState((a) => ({
                    ...structuredClone(a),
                    questionCount: item,
                  }));
                  setIsCountOpen(false);
                }}
                className="block text-left w-full py-2 px-4 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelector;
