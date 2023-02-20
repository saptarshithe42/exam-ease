import React from 'react'
import { useParams } from 'react-router-dom';

function QuestionPaper() {

  const { id } = useParams()

  return (
    <div>QuestionPaper ID : {id}</div>
  )
}

export default QuestionPaper;