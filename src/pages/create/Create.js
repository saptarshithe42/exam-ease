import React from 'react'
import { useState } from 'react'
import "./Create.css"
import MCQInput from './MCQInput'

export default function Create() {

    const [numberOfQuestions, setNumberOfQuestions] = useState(0)
    const [firstFormSubmitted, setFirstFormSubmitted] = useState(false)
    const [enteredQuestions, setEnteredQuestions] = useState(1)
    const [questionsList, setQuestionsList] = useState([])

    const convertToNum = (numString) => {
        setNumberOfQuestions(parseInt(numString))
    }

    const submitFirstForm = (e) => {
        e.preventDefault()
        setFirstFormSubmitted(true)
    }

    const updateQuestionList = (questionObject) => {
        setQuestionsList([...questionsList, questionObject])
    }

    const updateQuestionCount = () => {
        setEnteredQuestions((prevCount) => {
            return (prevCount + 1)
        })
    }

    return (
        <div>
            {!firstFormSubmitted &&
                <form>
                    <label>
                        <span>Enter number of questions : </span>
                        <input
                            required
                            type="Number"
                            onChange={(e) => convertToNum(e.target.value)}
                            value={numberOfQuestions}
                            min={0}
                        />
                    </label>

                    <button onClick={submitFirstForm}>OK</button>

                </form>}

            <div>{numberOfQuestions}</div>
            {firstFormSubmitted && (enteredQuestions <= numberOfQuestions) &&
                <div>
                    <MCQInput 
                    updateQuestionList={setQuestionsList}
                    questionNumber={enteredQuestions}
                    updateQuestionCount={setEnteredQuestions}
                     />
                    {/* <button onClick={updateQuestionCount}>OK</button> */}
                </div>
            }
            {
                <div>
                    Entered questions :-
                    {
                        questionsList.map((question) => {
                            return (
                                <div key={Math.random()}> 
                                {question.question}
                                {question.options} 
                                </div>
                            )
                    })}
                </div>
            }
        </div>
    )
}
