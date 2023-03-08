import React from 'react'

import "./QuestionViewComponent.css"

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function QuestionViewComponent({ question }) {

  const options = shuffle(question.options)


  return (
    <div className="question-view">

      <div className="question">{question.qno}) {question.question} <b>[Marks : {question.marks}]</b></div>
      <div className="options-list">
        {options.map((option, index) => {
          return (<span className="options" key={index}>({index + 1}) {option}</span>) 
        })}
      </div>
    </div>
  )
}

export default QuestionViewComponent