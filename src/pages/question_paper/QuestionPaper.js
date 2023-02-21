import React from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useDocument} from "../../hooks/useDocument"
import QuestionViewComponent from './QuestionViewComponent';

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

          <QuestionViewComponent  />
        </div>
      }
    </div>
  )
}

export default QuestionPaper;