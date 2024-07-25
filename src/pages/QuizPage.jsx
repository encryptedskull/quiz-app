import React from "react";
import { useState, useEffect } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";
export default function QuizPage() {
    const [content, setContent] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genAI = new GoogleGenerativeAI(
                    "AIzaSyAaEQ4bKIuYzVpbARJSIJbiJzhuBbQ3jpw"
                );

                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                });
                const prompt =
                    "give me 10 quiz questions about javascript with the difficulty level of intermediate. the format should be in json and also mark the correct answer in the json for each question. the correct answer should be a property in the json where the value should be the index of the correct answer in the answers array property";
                const result = await model.generateContent(prompt);

                const response = await result.response;
                let text = response.text();

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
            localStorage.getItem("questionsData") ?? "[]"
        );

        if (!storedQuestions) {
            fetchData();
        } else {
            setQuestions(storedQuestions);
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    return (
        <>
            <h1 className="bg-green-500">Tailwind</h1>
        </>
    );
}
