import React from "react";
import { nanoid } from "nanoid";

function Question(props) {
  function handleClick(answer) {
    if (props.checked) {
      return;
    }
    props.selectAnswer(props.questionId, answer);
  }

  const allAnswers = props.answers.map((answer) => {
    let id = null;
    if (props.checked) {
      if (props.correct === answer) {
        id = "correct";
      } else if (props.selected === answer) {
        id = "incorrect";
      } else {
        id = "not selected";
      }
    }
    return (
      <button
        key={nanoid()}
        id={id}
        className={answer === props.selected ? "answer selected" : "answer"}
        onClick={() => handleClick(answer)}
      >
        {atob(answer)}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h3 className="question">{atob(props.question)}</h3>
      <div className="answers-container">{allAnswers}</div>
      <hr />
    </div>
  );
}

export default Question;
