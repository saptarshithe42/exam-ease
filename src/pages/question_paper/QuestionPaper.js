import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from "../../hooks/useDocument"
import QuestionViewComponent from './QuestionViewComponent';
import { useReactToPrint } from 'react-to-print';

import "./QuestionPaper.css"

function QuestionPaper() {

  const { id } = useParams()

  const { user } = useAuthContext()

  const { document: questionPaper} = useDocument("question_papers", id)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    documentTitle: `question-paper-${id}`,
    content: () => componentRef.current,
  })



  return (
    <div className="question-paper" >
      <button onClick={handlePrint}>Download Paper</button>

      {questionPaper &&
        <div style={{ textAlign: "center" }} ref={componentRef}>
          <h1 style={{ marginTop: "2rem" }}>{questionPaper.name}</h1>
          <h5>Created By : {user.displayName}</h5>
          <h5>Full Marks : {questionPaper.totalMarks}</h5>
          <h5>Time : {(questionPaper.seconds) / 60} minutes</h5>
          <h6>Generated with : Exam Ease®</h6>
          {questionPaper.questionsList.map((question) => {
            return (<div key={question.qno} className="question-box"> <QuestionViewComponent question={question} /> </div>)
          })}

        </div>
      }
    </div>
  )
}

export default QuestionPaper;