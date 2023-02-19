import React from 'react'
import { Link } from 'react-router-dom'

function QuestionPaperList({ questions }) {
    return (
        <div>
            {(questions.length != 0) &&

                questions.map((questionPaper) => {

                    return (
                        <div>
                            <Link to={`/questions/${questionPaper}`} key={questionPaper}>{questionPaper}</Link>
                        </div>)
                })
            }
            
        </div>
    )
}

export default QuestionPaperList