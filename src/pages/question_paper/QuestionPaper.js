import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useDocument} from "../../hooks/useDocument"
import QuestionViewComponent from './QuestionViewComponent';

import "./QuestionPaper.css"

function QuestionPaper() {

  const { id } = useParams()

  const { user } = useAuthContext()

  const { document: questionPaper, error } = useDocument("question_papers", id)


  return (
    <div className="question-paper">
      {questionPaper &&
        <div>
          <h1>{questionPaper.name}</h1>
          <h5>Created By : {user.displayName}</h5>
          {/* <div className="question-box"> */}
          {questionPaper.questionsList.map((question) => {
              return (<div key={question.qno} className="question-box"> <QuestionViewComponent question={question} /> </div>)
          })}
          {/* </div> */}
          
        </div>
      }
    </div>
  )
}

export default QuestionPaper;