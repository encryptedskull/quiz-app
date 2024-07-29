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
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center  items-center">
      <div className="flex flex-col items-start bg-slate-50 p-4 border border-slate-400 shadow-md rounded">
        <div className="flex flex-row items-center mb-14">
          <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-3" />
          <h2 className="text-2xl font-bold text-black">Quizzie</h2>
        </div>
        <TopicSelector setBigState={setBigState} />
        <div className="flex items-center ">
          <div className="bg-slate-50 p-2 mt-6 ">
            <h3 className="text-xl font-bold mb-2 text-black">Instructions</h3>
            <ul className="list-disc list-inside text-black">
              <li>
                Select the Topic,Difficulty Level & Questions Number before
                starting Quiz
              </li>
              <li>Read each question carefully before answering.</li>
              <li>Select the best answer from the given options.</li>
              <li>Click Next to proceed to the next question.</li>
              <li>Good luck and do your best!</li>
            </ul>
          </div>
        </div>
        <div className=" flex flex-col justify-end ml-auto">
          {topic && difficulty && questionCount ? (
            <button
              onClick={handleGetQuiz}
              className="bg-green-600 text-white py-2 px-4 m-2 rounded"
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
