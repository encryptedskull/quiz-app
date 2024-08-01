import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const TopicSelector = ({ setBigState }) => {
  const questionArry = ["C++", "JavaScript", "Python", "Java"];
  const difficulties = ["Easy", "Medium", "Hard", "Expert"];
  const counts = [5, 10, 15, 20];

  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isCountOpen, setIsCountOpen] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);

  const formatOption = (option, selectedOption) =>
    option === selectedOption ? `• ${option}` : option;

  return (
    // <div className="bg-slate-50 flex justify-center w-full ">
    //   <div className="grid grid-cols-3 gap-8">
    //     <div className="relative">
    //       <button
    //         onClick={() => setIsTopicOpen((prev) => !prev)}
    //         className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
    //       >
    //         {selectedTopic ? ` ${selectedTopic}` : "Select Topic"}
    //       </button>
    //       {isTopicOpen && (
    //         <div className="absolute top-full  bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
    //           {questionArry.map((item) => (
    //             <button
    //               key={item}
    //               onClick={() => {
    //                 setSelectedTopic(item);
    //                 setBigState((a) => ({
    //                   ...structuredClone(a),
    //                   topic: item,
    //                 }));
    //                 setIsTopicOpen(false);
    //               }}
    //               // className="block text-left py-2 px-4 w-full hover:bg-gray-200"
    //               className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
    //                 selectedTopic === item
    //                   ? "dot-before items-right"
    //                   : "items-right"
    //               }`}
    //             >
    //               {item}
    //             </button>
    //           ))}
    //         </div>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <button
    //         onClick={() => setIsDifficultyOpen((prev) => !prev)}
    //         className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
    //       >
    //         {selectedDifficulty
    //           ? ` ${selectedDifficulty}`
    //           : "Select Difficulty"}
    //       </button>
    //       {isDifficultyOpen && (
    //         <div className="absolute top-full w-full mt-2 bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10">
    //           {difficulties.map((item) => (
    //             <button
    //               key={item}
    //               onClick={() => {
    //                 setSelectedDifficulty(item);
    //                 setBigState((a) => ({
    //                   ...structuredClone(a),
    //                   difficulty: item,
    //                 }));
    //                 setIsDifficultyOpen(false);
    //               }}
    //               // className="block text-left py-2 px-4 w-full  hover:bg-gray-200"
    //               className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
    //                 selectedDifficulty === item
    //                   ? "dot-before items-right"
    //                   : "items-right"
    //               }`}
    //             >
    //               {item}
    //             </button>
    //           ))}
    //         </div>
    //       )}
    //     </div>

    //     <div className="relative">
    //       <button
    //         onClick={() => setIsCountOpen((prev) => !prev)}
    //         className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
    //       >
    //         {selectedCount ? `${selectedCount}` : "Total Questions"}
    //       </button>
    //       {isCountOpen && (
    //         <div className="absolute top-full mt-2 bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
    //           {counts.map((item) => (
    //             <button
    //               key={item}
    //               onClick={() => {
    //                 setSelectedCount(item);
    //                 setBigState((a) => ({
    //                   ...structuredClone(a),
    //                   questionCount: item,
    //                 }));
    //                 setIsCountOpen(false);
    //               }}
    //               // className="block text-left py-2 px-4 w-full hover:bg-gray-200"
    //               className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
    //                 counts === item ? "dot-before items-right" : "items-right"
    //               }`}
    //             >
    //               {item}
    //             </button>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-slate-50 w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full md:w-4/5">
        <div className="relative">
          <button
            onClick={() => setIsTopicOpen((prev) => !prev)}
            className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full "
          >
            {selectedTopic ? `${selectedTopic}` : "Select Topic"}
          </button>
          {isTopicOpen && (
            <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
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
                  className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
                    selectedTopic === item
                      ? "dot-before items-right"
                      : "items-right"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDifficultyOpen((prev) => !prev)}
            className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
          >
            {selectedDifficulty ? `${selectedDifficulty}` : "Select Difficulty"}
          </button>
          {isDifficultyOpen && (
            <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
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
                  className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
                    selectedDifficulty === item
                      ? "dot-before items-right"
                      : "items-right"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsCountOpen((prev) => !prev)}
            className="bg-slate-200 text-black py-2 px-4 m-2 rounded w-full"
          >
            {selectedCount ? ` ${selectedCount}` : "Total Questions"}
          </button>
          {/* {isCountOpen && (
            <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
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
                  className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
                    counts === item ? "dot-before items-right" : "items-right"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )} */}
          {isCountOpen && (
            <div className="absolute top-full bg-slate-100 text-black py-2 px-4 rounded shadow-md z-10 w-full">
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
                  className={`block text-left py-2 px-4 w-full hover:bg-gray-200 ${
                    selectedCount === item
                      ? "dot-before items-right"
                      : "items-right"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
       
    </div>
  );
};

export default TopicSelector;

// const questionArry = ["C++", "JavaScript", "Python", "Machine Learning"];
// const difficulties = ["Easy", "Medium", "Hard", "Difficult"];
// const counts = [5, 10, 15, 20, 25, 30];

// // State variables for dropdowns
// const [isTopicOpen, setIsTopicOpen] = useState(false);
// const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
// const [isCountOpen, setIsCountOpen] = useState(false);

// // State variables for selected values
// const [selectedTopic, setSelectedTopic] = useState(null);
// const [selectedDifficulty, setSelectedDifficulty] = useState(null);
// const [selectedCount, setSelectedCount] = useState(null);

// return (
//   <div className="my-4 flex gap-10 items-center">
//     {/* Topic Dropdown */}
//     <div className="my-2 w-full">
//       <button
//         onClick={() => setIsTopicOpen((prev) => !prev)}
//         className="bg-blue-500 text-white py-2 px-4 m-2 rounded flex"
//       >
//         {selectedTopic ? `${selectedTopic}` : "Select Topic"}{" "}
//         {isTopicOpen ? <FaAngleUp /> : <FaAngleDown />}
//       </button>
//       {isTopicOpen && (
//         <div className="bg-white shadow-md rounded p-4 mt-2">
//           {questionArry.map((item) => (
//             <button
//               key={item}
//               onClick={() => {
//                 setSelectedTopic(item);
//                 setBigState((a) => ({
//                   ...structuredClone(a),
//                   topic: item,
//                 }));
//                 setIsTopicOpen(false);
//               }}
//               className="block text-left w-full py-2 px-4 hover:bg-gray-200"
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>

//     {/* Difficulty Dropdown */}
//     <div className="my-2 w-full">
//       <button
//         onClick={() => setIsDifficultyOpen((prev) => !prev)}
//         className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
//       >
//         {selectedDifficulty ? `${selectedDifficulty}` : "Select Difficulty"}{" "}
//         {isDifficultyOpen ? <FaAngleUp /> : <FaAngleDown />}
//       </button>
//       {isDifficultyOpen && (
//         <div className="bg-white shadow-md rounded p-4 mt-2">
//           {difficulties.map((item) => (
//             <button
//               key={item}
//               onClick={() => {
//                 setSelectedDifficulty(item);
//                 setBigState((a) => ({
//                   ...structuredClone(a),
//                   difficulty: item,
//                 }));
//                 setIsDifficultyOpen(false);
//               }}
//               className="block text-left w-full py-2 px-4 hover:bg-gray-200"
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>

//     {/* Question Count Dropdown */}
//     <div className="my-2 w-full">
//       <button
//         onClick={() => setIsCountOpen((prev) => !prev)}
//         className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
//       >
//         {selectedCount ? `${selectedCount}` : "Total Questions"}{" "}
//         {isCountOpen ? <FaAngleUp /> : <FaAngleDown />}
//       </button>
//       {isCountOpen && (
//         <div className="bg-white shadow-md rounded p-4 mt-2">
//           {counts.map((item) => (
//             <button
//               key={item}
//               onClick={() => {
//                 setSelectedCount(item);
//                 setBigState((a) => ({
//                   ...structuredClone(a),
//                   questionCount: item,
//                 }));
//                 setIsCountOpen(false);
//               }}
//               className="block text-left w-full py-2 px-4 hover:bg-gray-200"
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// );
