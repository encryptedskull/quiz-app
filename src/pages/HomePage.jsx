import DifficultySelector from "../components/DifficultySelector";
import QuestionSelector from "../components/QuestionCountSelector";
import TopicSelector from "../components/TopicSelector";
import { useNavigate } from "react-router-dom";
import mindImage from "/mind.svg";

const HomePage = ({ bigState, setBigState }) => {
  const { difficulty, topic, questionCount } = bigState;

  const navigate = useNavigate();

  const handleGetQuiz = () => {
    navigate("./get");

    setBigState((prev) => ({
      ...structuredClone(prev),
      getData: true,
    }));
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center">
      <div className="bg-gray-700 p-8 rounded  flex flex-col items-center ">
        <div className="flex flex-row">
          <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-4" />
          <h2 className="text-3xl font-bold mb-2 text-white">QUIZ APP</h2>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-gray-700 p-8 mt-8 rounded w-full max-w-3xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Instructions</h3>
            <ul className="list-disc list-inside text-white">
              <li>Read each question carefully before answering.</li>
              <li>Select the best answer from the given options.</li>
              <li>Click Next to proceed to the next question.</li>
              <li>Good luck and do your best!</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <TopicSelector setBigState={setBigState} />
          {/* <DifficultySelector setBigState={setBigState} /> */}
          {/* <QuestionSelector setBigState={setBigState} /> */}
        </div>
        <div className="bg-gray-700 p-4 mt-8 rounded w-full max-w-2xl flex items-center justify-between ">
          <div className="text-white">
            <p>Difficulty: {difficulty}</p>
            <p>Topic: {topic}</p>
            <p>Number of Questions: {questionCount}</p>
          </div>
          {topic && difficulty && questionCount ? (
            <button
              onClick={handleGetQuiz}
              className="bg-blue-500 text-white py-2 px-4 m-2 rounded"
            >
              Get Quiz
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
