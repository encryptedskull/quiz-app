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
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="w-4/5 md:w-3/5">
          <div className="flex items-center mb-4">
            <img src={mindImage} alt="Quiz Icon" className="w-10 h-10 mr-3" />
            <h2 className="text-2xl font-bold text-black">Quizzie</h2>
          </div>
          <div className="flex flex-col bg-slate-50 p-4 border shadow-md rounded relative h-96">
            <div className="flex justify-center items-center mt-6">
              <TopicSelector setBigState={setBigState} />
            </div>
            <div className="flex items-center">
              <div className="bg-slate-50 p-2 mt-10 hidden md:block md:w-4/5">
                <h3 className="text-xl font-bold mb-2 text-black">
                  Instructions
                </h3>
                <ul className="list-disc list-inside text-black">
                  <li>
                    Select the Topic, Difficulty Level & Questions Number before
                    starting Quiz
                  </li>
                  <li>Read each question carefully before answering.</li>
                  <li>Select the best answer from the given options.</li>
                  <li>Click Next to proceed to the next question.</li>
                  <li>Good luck and do your best!</li>
                </ul>
              </div>
            </div>
            <div className="md:flex md:justify-end md:items-end md:absolute md:bottom-5 md:right-5 flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default HomePage;
