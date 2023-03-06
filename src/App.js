import React, { useState, useEffect } from "react";
import "./App.css";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import greyBlob from "./images/grey blob.png";
import yellowBlob from "./images/yellow blob.png";
import { nanoid } from "nanoid";

function App() {
  const [startGame, setStartGame] = useState(
    JSON.parse(localStorage.getItem("start")) || false
  );
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&encode=base64"
      );
      const data = await res.json();
      setQuestions(
        data.results.map((question) => {
          return {
            id: nanoid(),
            answers: [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(() => Math.random() - 0.5),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false,
          };
        })
      );
    }
    getQuestions();
  }, [count]);

  useEffect(() => {
    localStorage.setItem("start", JSON.stringify(startGame));
  }, [startGame]);

  function startQuiz() {
    setStartGame(true);
  }

  function selectAnswer(id, answer) {
    setQuestions((questions) => {
      return questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      });
    });
  }

  function handleCheck() {
    setQuestions((questions) => {
      return questions.map((question) => {
        return { ...question, checked: true };
      });
    });
    setChecked(true);
    let correct = 0;
    questions.forEach((question) => {
      if (question.correct === question.selected) {
        correct += 1;
      }
    });
    setCorrect(correct);
  }

  function playAgain() {
    setChecked(false);
    setCount((count) => count + 1);
  }

  console.log(checked);
  const questionElement = questions.map((question) => {
    return (
      <Question
        key={question.id}
        questionId={question.id}
        answers={question.answers}
        checked={question.checked}
        selected={question.selected}
        question={question.question}
        correct={question.correct}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <div className="app-container">
      {startGame ? (
        <>
          {questionElement}
          <div className="check-score-container">
            {checked && (
              <span className="score">
                You scored {correct}/5 correct answers
              </span>
            )}
            <button
              className="check-answers-btn"
              onClick={checked ? playAgain : handleCheck}
            >
              {checked ? "Play Again" : "Check Answer"}
            </button>
          </div>
        </>
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
      <img className="grey-blob" src={greyBlob} />
      <img className="yellow-blob" src={yellowBlob} />
    </div>
  );
}

export default App;
