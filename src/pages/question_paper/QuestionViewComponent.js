import React from 'react'

import "./QuestionViewComponent.css"

function QuestionViewComponent({ question }) {


  return (
    <div className="question-view">

      <div className="question">{question.question}</div>
      <div className="options-list">
        {question.options.map((option, index) => {
          return (<span className="options" key={index}>({index + 1}) {option}</span>) 
        })}
      </div>
    </div>
  )
}

export default QuestionViewComponent