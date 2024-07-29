import React from "react";
import { useState, useEffect } from "react";
import { formatSeconds } from "../utils/utils";

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
  const [isDataLoaded, setIsDataLoaded] = useState(questions.length > 0);

  const handleNext = () => {
    setBigState((prev) => ({
      ...structuredClone(prev),
      currentIndex: currentIndex + 1,
    }));
  };

  useEffect(() => {
    let timer;

    if (isDataLoaded) {
      timer = setInterval(() => {
        if (seconds === 0) {
          clearInterval(timer);
          return;
        }

        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDataLoaded, seconds]);

  if (!isDataLoaded) {
    return (
      <div className="h-screen grid place-content-center">
        <h2>Loading ...</h2>
      </div>
    );
  }
  // useEffect(() => {
  //   if (isDataLoaded) {
  //     setBigState((previous) => ({
  //       ...structuredClone(previous),
  //       loaded: true,
  //     }));
  //   }
  // }, [isDataLoaded, setBigState]);

  // useEffect(() => {
  //   console.log("Questions: ", questions);
  //   console.log("Current Index: ", currentIndex);
  //   if (questions.length > 0 && questions[currentIndex]) {
  //     console.log("Current Question: ", questions[currentIndex]);
  //   }
  // }, [questions, currentIndex]);
  return (
    <>
      {" "}
      <div className="border border-blue-900 flex justify-center items-center">
        <div className="border border-red-900">
          {questions.length > 0 && (
            <div className="border border-red-500">
              <h2>{questions[currentIndex].question}</h2>
              <div className="border border-red-300">
                {questions[currentIndex].answers.map((answer, index) => (
                  <button key={index} className="flex border border-red-400">
                    <span>{String.fromCharCode(97 + index)}.</span>
                    {answer}
                  </button>
                ))}
              </div>

              <button onClick={handleNext}>Next</button>
              <h4>{formatSeconds(seconds)}</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
