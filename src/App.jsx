// import { useState } from 'react';
// import DifficultySelector from './components/DifficultySelector';
// import QuestionSelector from './components/QuestionCountSelector';
// import TopicSelector from './components/TopicSelector';

// export default function App() {
//     const [difficulty, setDifficulty] = useState('');
//     const [topic, setTopic] = useState('');
//     const [questionCount, setQuestionCount] = useState(0);

//     return (
//         <div className='bg-gray-800 min-h-screen flex flex-col items-center '>
//             <div className="bg-gray-700 p-8 rounded w-900 h-900 flex flex-col items-center  shadow-lg shadow-blue-500/50 ">
//                 <img src="./mind.svg" alt="Quiz Icon" className="w-12 h-12 mr-4" />
//                 <h2 className="text-2xl font-bold mb-2 text-white">QUIZ APP</h2>
//                 <TopicSelector setTopic={setTopic} />
//                 <DifficultySelector setDifficulty={setDifficulty} />
//                 <QuestionSelector setQuestionCount={setQuestionCount} />
//             </div>
//             <div className="bg-gray-700 p-4 mt-8 rounded w-900 flex items-center justify-between shadow-lg shadow-blue-500/50">
//                 <div className="text-white">
//                     <p>Difficulty: {difficulty || 'None'}</p>
//                     <p>Topic: {topic || 'None'}</p>
//                     <p>Number of Questions: {questionCount}</p>
//                 </div>
//                 <button className="bg-blue-500 text-white py-2 px-4 m-2 rounded">Start Quiz</button>
//             </div>

//         </div>
//     );
// }

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";

const o = {
  currentIndex: 0,
  questions: [
    {
      selectedAnswer: null,
    },
    {
      selectedAnswer: null,
    },
    {},
  ],
  questionCount: 0,
  difficulty: "",
  topic: "",
};

function App() {
  //   const [difficulty, setDifficulty] = useState("");
  //   const [topic, setTopic] = useState("");
  //   const [questionCount, setQuestionCount] = useState(0);

  const [bigState, setBigState] = useState(o);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage bigState={bigState} setBigState={setBigState} />}
        />
        <Route
          path="/quiz"
          element={<QuizPage bigState={bigState} setBigState={setBigState} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
