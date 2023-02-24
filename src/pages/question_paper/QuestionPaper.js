import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from "../../hooks/useDocument"
import QuestionViewComponent from './QuestionViewComponent';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';

import "./QuestionPaper.css"

function QuestionPaper() {

  const { id } = useParams()

  const { user } = useAuthContext()

  const { document: questionPaper, error } = useDocument("question_papers", id)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    documentTitle: `question-paper-${id}`,
    content: () => componentRef.current,
  })



  return (
    <div className="question-paper" >
      <button onClick={handlePrint}>Print Question Paper</button>

      {questionPaper &&
        <div style={{textAlign : "center"}} ref={componentRef}>
          <h1 style={{marginTop : "2rem"}}>{questionPaper.name}</h1>
          <h5>Created By : {user.displayName}</h5>

          {/* {!printPressed && <button onClick={printHandler}>Print Question Paper</button>} */}

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