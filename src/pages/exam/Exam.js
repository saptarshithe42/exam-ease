import React from 'react'
import { useState } from 'react'
import { projectFirestore } from '../../firebase/config'

import "./Exam.css"

function Exam() {

    const [questionPaperCode, setQuestionPaperCode] = useState("")
    const [error, setError] = useState(null)
    const [questionPaper, setQuestionPaper] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError(null)
        try {
            const docSnap = await projectFirestore.collection("question_papers").doc(questionPaperCode).get()

            // console.log(docSnap.exists)
            
            if(docSnap.exists === false)
            {
                throw "Invalid question paper code."
            }

            const data = docSnap.data()
            setQuestionPaper(data)
            console.log(data)
        }
        catch (err) {
            setError(err)
            console.log(err)
        }
    }

    return (
        <div>
            {<form>
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
            {questionPaper && 
                questionPaper.questionsList.map((question) => {
                    return (<div key={question}>
                    {question.question}
                    <div> {question.options.map((option) => {

                        return (<div key={option}>{option}</div>)

                    })} </div>
                    </div>)
                })
            }
        </div>
    )
}

export default Exam