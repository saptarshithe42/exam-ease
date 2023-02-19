import React from 'react'
import { useState } from 'react'

function MCQInput(props) {

    const [question, setQuestion] = useState("")
    const [questionEntered, setQuestionEntered] = useState(false)
    const [option, setOption] = useState("")
    const [enterOption, setEnterOption] = useState(false)
    const [optionsList, setOptionsList] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [enteredCorrectAnswer, setEnteredCorrectAnswer] = useState(false)

    const addOption = () => {

        setOptionsList((prevList) => {
            return [...prevList, option]
        })
        setOption("")
        setEnterOption(false)
    }

    const addCorrectAnswer = () => {

        setEnteredCorrectAnswer(true)
        setOptionsList((prevList) => {
            return [...prevList, correctAnswer]
        })

    }


    const handleSubmit = () => {
        props.updateQuestionCount(props.questionNumber + 1)
        props.updateQuestionList((prevList) => {


            const questionObject = {
                question: question, 
                options : optionsList, 
                correctAnswer : correctAnswer
            }

            return [...prevList, questionObject]
        })
        setQuestion("")
        setOptionsList([])
        setQuestionEntered(false)
        setCorrectAnswer("")
        setEnteredCorrectAnswer(false)
        setEnterOption(false)
    }




    return (
        <div>
            {questionEntered && <div>{question}</div>}
            {!questionEntered &&
                <label>
                    <span>{props.questionNumber}Enter Question : </span>
                    <textarea
                        required
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    ></textarea>
                    <button onClick={() => { setQuestionEntered(true) }} className="btn btn-primary">Add question</button>
                </label>
            }

            {!enteredCorrectAnswer && questionEntered &&
                <label>
                    <span>Enter correct answer : </span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        value={correctAnswer}
                    />
                    <button onClick={addCorrectAnswer} className="btn btn-primary">OK</button>
                </label>
            }
            {questionEntered && !enterOption && enteredCorrectAnswer &&

                <button onClick={() => setEnterOption(true)} >Add other option</button>
            }
            {enterOption &&
                <label>
                    <span>Enter Option :</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setOption(e.target.value)}
                        value={option}
                    />
                    <button onClick={addOption}>OK</button>
                </label>}
            {(optionsList.length > 1)  && !enterOption && <button onClick={handleSubmit}>Submit Question</button>}
        </div>
    )
}

export default MCQInput