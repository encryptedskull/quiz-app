import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useNavigate } from "react-router-dom";
import QuizPage from "./QuizPage";
export default function GetPage({ bigState, setBigState }) {
  const { loaded, topic, questionCount, getData, difficulty } = bigState;
  // const [quizMounted, setQuizMounted] = useState(false);

  const fetchData = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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
        loaded: true,
      }));
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    if (getData) {
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
          loaded: true,
        }));
        //   setQuestions(storedQuestions);

        console.log(loaded);
      }
    }
  }, [difficulty, topic, getData, questionCount, setBigState]);

  const navigate = useNavigate();
  const handleAttempt = () => {
    navigate("/quiz");
  };
  const handleHome = () => {
    navigate("/");
  };
  // useEffect(() => {
  //   if (getData) {
  //     setQuizMounted(true);
  //   }
  // }, [getData]);

  console.log(loaded);
  console.log(getData);
  return (
    <>
      <div className="h-screen grid place-content-center">
        <div>
          <h3>{`Total Question : ${questionCount}`}</h3>
          <h3>{`Time Allowed : ${questionCount} minutes`}</h3>
          <h3>{`Total Marks : ${questionCount}`}</h3>
          <div>
            <button onClick={handleHome}>Home Page</button>
            {loaded ? (
              <button onClick={handleAttempt}>Start Attempt</button>
            ) : null}
            {/* <button onClick={handleAttempt}>Start Attempt</button> */}
          </div>
        </div>
        {/* {quizMounted && (
          <QuizPage bigState={bigState} setBigState={setBigState} />
        )} */}
      </div>
    </>
  );
}
