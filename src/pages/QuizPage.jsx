import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { GoogleGenerativeAI } from "@google/generative-ai";
export default function QuizPage() {
    const [content, setContent] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const location = useLocation();
    const { difficulty, topic, questionCount } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genAI = new GoogleGenerativeAI(
                    "AIzaSyAaEQ4bKIuYzVpbARJSIJbiJzhuBbQ3jpw"
                );

                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                });
                const prompt = `give me ${questionCount} quiz questions about ${topic} with the difficulty level of ${difficulty}. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property`;
                const result = await model.generateContent(prompt);
                console.log(questionCount, topic, difficulty);

                const response = await result.response;
                let text = await response.text();

                text = text.replaceAll(/json|javascript|/g, "");
                text = text.replaceAll(/##/g, "");
                text = text.replaceAll(/\*\*/g, "");
                text = text.replaceAll(/```/g, "");

                setContent(text);
                console.log(text);

                try {
                    const jasonHolder = JSON.parse(text);

                    console.log(jasonHolder);
                    localStorage.setItem(
                        "questionsData",
                        JSON.stringify(jasonHolder)
                    );
                    setQuestions(jasonHolder);
                } catch (e) {
                    console.error("Parsing error:", e);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };
        const storedQuestions = JSON.parse(
            localStorage.getItem("questionsData") ?? "null"
        );

        if (!storedQuestions) {
            fetchData();
        } else {
            setQuestions(storedQuestions);
            setIsDataLoaded(true);
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(questionCount);

    useEffect(() => {
        let timer;
        if (isDataLoaded) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isDataLoaded, seconds, minutes]);
    const formatTime = (time) => (time < 10 ? `0${time}` : time);
    return (
        <>
            {" "}
            <div className="border border-blue-900 flex justify-center items-center">
                <div className="border border-red-900">
                    {questions.length > 0 && (
                        <div className="border border-red-500">
                            <h2>{questions[currentIndex].question}</h2>
                            <div className="border border-red-300">
                                {questions[currentIndex].answers.map(
                                    (answer, index) => (
                                        <label key={index} className="flex">
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={answer}
                                                // className="hidden"
                                            />

                                            <span>
                                                {String.fromCharCode(
                                                    97 + index
                                                )}
                                                .
                                            </span>
                                            {answer}
                                        </label>
                                    )
                                )}
                            </div>

                            <button onClick={handleNext}>Next</button>
                            <h4>
                                {formatTime(minutes)}:{formatTime(seconds)}
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
