import React from 'react'
import { useState } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import "./Exam.css"

// components
import ExamSidebar from './ExamSidebar'

function Exam() {

    const [questionPaperCode, setQuestionPaperCode] = useState("")
    const [error, setError] = useState(null)
    const [questionPaper, setQuestionPaper] = useState(null)
    const [codeEntered, setCodeEntered] = useState(false)

    const [questionSelected, setQuestionSelected] = useState(1)

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError(null)
        setCodeEntered(true)
        try {
            const docSnap = await projectFirestore.collection("question_papers").doc(questionPaperCode).get()

            // console.log(docSnap.exists)

            if (docSnap.exists === false) {
                throw "Invalid question paper code."
            }

            const data = docSnap.data()
            setQuestionPaper(data)
            console.log(data)
        }
        catch (err) {
            setError(err)
            setQuestionPaper(null)
            console.log(err)
        }
    }

    return (
        <div className="exam">
            {!codeEntered && <form>
                <label>
                    <span>Enter question paper code : </span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setQuestionPaperCode(e.target.value)}
                        value={questionPaperCode}
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>}
            {error && <div>{error}</div>}

            <div className="question-paper">
                {questionPaper && user &&
                    <ExamSidebar
                        numberOfQuestions={questionPaper.questionsList.length}
                        updateSelectedQuestion={setQuestionSelected}
                    />}

                <div className="question-view-div">
                    {/* {questionPaper &&
                        questionPaper.questionsList.map((question) => {
                            return (<div key={question}>
                                {question.question}
                                <div> {question.options.map((option) => {

                                    return (<div key={option}>{option}</div>)

                                })} </div>
                            </div>)
                        })
                    } */}
                    {questionPaper &&
                        <div >
                            {questionPaper.questionsList[questionSelected-1].question}
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Exam