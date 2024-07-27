import React from "react";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatSeconds } from "../utils/utils";

export default function QuizPage({
  bigState: { difficulty, topic, questionCount, questions, currentIndex },
  setBigState,
}) {
  const [seconds, setSeconds] = useState(questionCount * 1 * 60);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const prompt = `give me ${questionCount} quiz questions about ${topic} with the difficulty level of ${difficulty}. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property`;
        const result = await model.generateContent(prompt);
        console.log(questionCount, topic, difficulty);

        const response = await result.response;
        let text = await response.text();

        text = text.replaceAll(/json|javascript|##|\*\*|```/g, "");
        text = text.replaceAll(/##/g, "");
        text = text.replaceAll(/\*\*/g, "");
        text = text.replaceAll(/```/g, "");

        console.log(text);

        const jasonHolder = JSON.parse(text);

        console.log(jasonHolder);
        localStorage.setItem("questionsData", JSON.stringify(jasonHolder));

        setBigState((prev) => ({
          ...structuredClone(prev),
          questions: jasonHolder,
        }));

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    const storedQuestions = JSON.parse(
      localStorage.getItem("questionsData") ?? "[]"
    );

    console.log(storedQuestions);

    if (!storedQuestions.length) {
      fetchData();
    } else {
      setBigState((prev) => ({
        ...structuredClone(prev),
        questions: storedQuestions,
      }));
      //   setQuestions(storedQuestions);
      setIsDataLoaded(true);
    }
  }, []);

  const handleNext = () => {};

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

  if (!isDataLoaded)
    return <div className="h-screen grid place-content-center">Loading...</div>;

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
                  <label key={index} className="flex">
                    <input
                      type="radio"
                      name="answer"
                      value={answer}
                      // className="hidden"
                    />

                    <span>{String.fromCharCode(97 + index)}.</span>
                    {answer}
                  </label>
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
