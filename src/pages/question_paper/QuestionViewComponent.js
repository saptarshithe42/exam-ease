import React from 'react'

import "./QuestionViewComponent.css"

function QuestionViewComponent({ question }) {

  const options = question.options

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