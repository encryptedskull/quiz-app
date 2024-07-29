// import React from "react";
// import { useState, useEffect } from "react";
// import { formatSeconds } from "../utils/utils";

// export default function QuizPage({
//   bigState: {
//     difficulty,
//     topic,
//     questionCount,
//     questions,
//     currentIndex,
//     getData,
//     loaded,
//   },
//   setBigState,
// }) {
//   const [seconds, setSeconds] = useState(questionCount * 1 * 60);
//   const [isDataLoaded, setIsDataLoaded] = useState(questions.length > 0);

//   const handleNext = () => {
//     setBigState((prev) => ({
//       ...structuredClone(prev),
//       currentIndex: currentIndex + 1,
//     }));
//   };

//   useEffect(() => {
//     let timer;

//     if (isDataLoaded) {
//       timer = setInterval(() => {
//         if (seconds === 0) {
//           clearInterval(timer);
//           return;
//         }

//         setSeconds((sec) => sec - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isDataLoaded, seconds]);

//   if (!isDataLoaded) {
//     return (
//       <div className="h-screen grid place-content-center">
//         <h2>Loading ...</h2>
//       </div>
//     );
//   }
//   // useEffect(() => {
//   //   if (isDataLoaded) {
//   //     setBigState((previous) => ({
//   //       ...structuredClone(previous),
//   //       loaded: true,
//   //     }));
//   //   }
//   // }, [isDataLoaded, setBigState]);

//   // useEffect(() => {
//   //   console.log("Questions: ", questions);
//   //   console.log("Current Index: ", currentIndex);
//   //   if (questions.length > 0 && questions[currentIndex]) {
//   //     console.log("Current Question: ", questions[currentIndex]);
//   //   }
//   // }, [questions, currentIndex]);
//   return (
//     <>
//       {" "}
//       <div className="border border-blue-900 flex justify-center items-center">
//         <div className="border border-red-900">
//           {questions.length > 0 && (
//             <div className="border border-red-500">
//               <h2>{questions[currentIndex].question}</h2>
//               <div className="border border-red-300">
//                 {questions[currentIndex].answers.map((answer, index) => (
//                   <button key={index} className="flex border border-red-400">
//                     <span>{String.fromCharCode(97 + index)}.</span>
//                     {answer}
//                   </button>
//                 ))}
//               </div>

//               <button onClick={handleNext}>Next</button>
//               <h4>{formatSeconds(seconds)}</h4>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { formatSeconds } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function QuizPage({
  bigState: {
    difficulty,
    topic,
    questionCount,
    questions,
    currentIndex,
    getData,
    loaded,
  },
  setBigState,
}) {
  const [seconds, setSeconds] = useState(questionCount * 1 * 60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(questions.length > 0);
  const [lineWidth, setLineWidth] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(questionCount).fill(null)
  );
  const [quizFinished, setQuizFinished] = useState(false);
  // const [results, setResults] = useState({ correct: 0, total: questionCount });

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isDataLoaded) {
      timer = setInterval(() => {
        if (seconds === 0) {
          clearInterval(timer);
          handleSubmit();
          return;
        }
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDataLoaded, seconds]);

  useEffect(() => {
    setLineWidth((currentIndex / questions.length) * 100);
  }, [currentIndex, questions.length]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setUserAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentIndex] = selectedAnswer;
        return newAnswers;
      });
      setSelectedAnswer(null);
      setBigState((prev) => ({
        ...structuredClone(prev),
        currentIndex: prev.currentIndex + 1,
      }));
    }
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    // const correctCount = calculateResults();
    // setResults({ correct: correctCount, total: questionCount });
    if (selectedAnswer !== null) {
      setUserAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentIndex] = selectedAnswer;
        return newAnswers;
      });
    }
    setQuizFinished(true);
    setLineWidth(100);
    localStorage.clear();
  };

  if (quizFinished) {
    // const percentageCorrect = (results.correct / results.total) * 100;
    const percentageCorrect = (calculateResults / questions.length) * 100;
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-4">
        <div className="bg-slate-200 p-8 w-900 rounded flex items-center h-full flex-col border border-slate-500">
          <h1 className="text-slate-800 text-2xl mt-4 mb-4 ">Quiz Results</h1>
          <div
            className="w-32 h-32  rounded-full flex items-center justify-center relative text-black"
            style={{
              background: ` conic-gradient(
                  #4CAF50 ${percentageCorrect}%, #ffff ${percentageCorrect}% 100%
                )`,
            }}
          >
            <div className="absolute text-xl font-bold">
              {calculateResults()}/{questions.length}
            </div>
          </div>
          <p>
            You answered {calculateResults()} out of {questions.length}{" "}
            questions correctly
          </p>
          <button
            onClick={() => {
              navigate("/");
              localStorage.clear();

              setBigState((prev) => ({
                ...structuredClone(prev),
                currentIndex: 0,
                questions: [],
                difficulty: "",
                topic: "",
                questionCount: 0,
                loaded: false,
              }));
            }}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 border border-gray-500 rounded-lg shadow-md relative">
        <div
          className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-500"
          style={{ width: `${lineWidth}%` }}
        />
        <div className="flex flex-row justify-between w-full mb-4 pt-6">
          <h4 className="text-left text-xl text-slate-500 font-bold">
            Question {currentIndex + 1} of {questions.length}
          </h4>
          <h4 className="text-right text-xl text-slate-500 font-bold">
            Time Remaining: {formatSeconds(seconds)}
          </h4>
        </div>
        {questions.length > 0 && (
          <div className="grid">
            <h4 className="text-xl mb-4">{questions[currentIndex].question}</h4>
            <div className="m-3 grid grid-cols-2 gap-3">
              {questions[currentIndex].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`flex items-center p-2 cursor-pointer mb-5 border rounded-md border-slate-500 ${
                    selectedAnswer === index ? "bg-slate-300" : "bg-slate-50"
                  }`}
                  onClick={() => setSelectedAnswer(index)}
                  disabled={quizFinished}
                >
                  <span>{String.fromCharCode(65 + index)}. </span>
                  {answer}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              {currentIndex < questions.length - 1 ? (
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded mt-4"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded mt-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
