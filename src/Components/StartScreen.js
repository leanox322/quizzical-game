import React from "react";
import "../App.css";

function StartScreen(props) {
  return (
    <div>
      <h1 className="title">Quizzical</h1>
      <h2 className="description">Some description if needed</h2>
      <button onClick={props.startQuiz} className="start-btn">
        Start quiz
      </button>
    </div>
  );
}

export default StartScreen;
