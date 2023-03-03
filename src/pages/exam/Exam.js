import React from "react"
import { useState } from "react"
import { projectFirestore } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"

// styles
import "./Exam.css"

// components
import ExamSidebar from "./ExamSidebar"
import OptionsView from "./OptionsView"


function Exam() {

    const [questionPaperCode, setQuestionPaperCode] = useState("")
    const [error, setError] = useState(null)
    const [questionPaper, setQuestionPaper] = useState(null)
    const [codeEntered, setCodeEntered] = useState(false)

    // holds the question number of currently chosen question
    const [questionSelected, setQuestionSelected] = useState(0)

    // holds index of selected option of particular question
    const [selectedOption, setSelectedOption] = useState(-1)
    // const activeOption = { backgroundColor: "yellow" }

    // contains index of the options selected (-1 for no selection)
    const [answerMap, setAnswerMap] = useState(new Map())

    const { user } = useAuthContext()


    const saveAnswer = () => {
        setAnswerMap((prev) => {
            let newMap = new Map(prev)
            newMap.set(questionSelected, selectedOption)
            return newMap
        })
        setSelectedOption(-1)
        setQuestionSelected((prev) => {
            return ((prev + 1) % (questionPaper.questionsList.length))
        })
        console.log(answerMap)
    }

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
            // console.log(answerList)
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
                        <div>
                            <div className="question-box">
                                ({questionPaper.questionsList[questionSelected].qno}) {questionPaper.questionsList[questionSelected].question}
                            </div>

                            {/* <div className="options-box container"> */}
                            <div className="options-box">
                                {/* <div className="row"> */}
                                {/* testing options shuffle */}
                                {/* <div>
                                    {questionPaper.questionsList[questionSelected - 1].options.map((option, index) => {
                                        return (
                                            <div key={index}
                                                className="option"
                                                onClick={() => setSelectedOption(index)}
                                                style={selectedOption === (index) ? activeOption : null}
                                            >
                                                ({index + 1}) {option}
                                            </div>)
                                    })}
                                </div> */}
                                <OptionsView 
                                    options={questionPaper.questionsList[questionSelected].options}
                                    setSelectedOption={setSelectedOption}
                                    selectedOption={selectedOption}
                                />
                                <div>
                                    <button className="save-btn" onClick={() => setSelectedOption(-1)}>Clear Selection</button>
                                    <button className="save-btn" onClick={saveAnswer}>Save and Next</button>
                                </div>
                            </div>

                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Exam