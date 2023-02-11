import React from 'react'
import { useState } from 'react'

function MCQInput(props) {

    const [question, setQuestion] = useState("")
    const [questionEntered, setQuestionEntered] = useState(false)
    const [option, setOption] = useState("")
    const [enterOption, setEnterOption] = useState(false)
    const [optionsList, setOptionsList] = useState([])

    const addOption = () => {

        setOptionsList((prevList) => {
            return [...prevList, option]
        })
        setOption("")
    }


    const handleSubmit = () => {
        props.updateQuestionCount(props.questionNumber+1)
        props.updateQuestionList((prevList) => {
            return [...prevList, {question : question, options : optionsList}]
        })
        setQuestion("")
    }




    return (
        <div>
           {!questionEntered  &&
            <label>
                <span>{props.questionNumber}Enter Question : </span>
                <textarea
                    required
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                ></textarea>
                <button onClick={() => {setQuestionEntered(true)}}>Add question</button>
            </label>
            }
            {questionEntered && <div>{question}</div>}
            {questionEntered && !enterOption &&
                
                <button onClick={() => setEnterOption(true)}>Add an option</button>
            }
            {enterOption && 
                <label>
                <span>Enter Option :</span>
                <input
                type="text"
                onChange={(e) => setOption(e.target.value)}
                value={option}
                />
                <button onClick={addOption}>OK</button>
            </label>}
            <button onClick={handleSubmit}>Submit Question</button>
        </div>
    )
}

export default MCQInput