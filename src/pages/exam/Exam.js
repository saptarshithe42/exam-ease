import React from "react"
import { useState } from "react"
import { projectFirestore, timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useHistory } from "react-router-dom"
import { useMemo } from "react"

// styles
import "./Exam.css"

// components
import ExamSidebar from "./ExamSidebar"
import OptionsView from "./OptionsView"


function Exam() {

    const history = useHistory()
    const [questionPaperCode, setQuestionPaperCode] = useState("")
    const [error, setError] = useState(null)
    const [questionPaper, setQuestionPaper] = useState(null)
    const [codeEntered, setCodeEntered] = useState(false)

    // holds the question number (index) of currently chosen question
    const [questionSelected, setQuestionSelected] = useState(0)

    // holds index of selected option of particular question (-1 for no selection)
    const [selectedOption, setSelectedOption] = useState(-1)
    // const activeOption = { backgroundColor: "yellow" }

    // contains index of the options selected (-1 for no selection)
    const [answerMap, setAnswerMap] = useState(new Map())

    const { user } = useAuthContext()

    

    const clearSelection = () => {
        setSelectedOption(-1)

        setAnswerMap((prev) => {
            let newMap = new Map(prev)
            newMap.set(questionSelected, -1)
            return newMap
        })
    }

    // console.log("exam.js rendered")

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
            // console.log(data)
            // console.log(answerList)
        }
        catch (err) {
            setError(err)
            setQuestionPaper(null)
            console.log(err)
        }
    }

    const submitAnswer = async () => {

        const attemptedAt = timestamp.fromDate(new Date())
        let count = 0
        let marksObtained = 0
        let questionArr = questionPaper.questionsList
        console.log(answerMap)
        questionArr.map((question, index) => {
            let optionArr = question.options
            let correctAnswer = question.correctAnswer
            if(answerMap.has(index) && (optionArr[answerMap.get(index)] === correctAnswer))
            {
                count += 1
                marksObtained += question.marks
            }
        })

        console.log("count = " + count)
        console.log("marks obtained : " + marksObtained)
        

        try{
			const userRef = projectFirestore.collection("users").doc(user.uid);

			let testArray = (await userRef.get()).data().testHistory


			testArray.push({
                id : questionPaperCode, 
				name : questionPaper.name,
				attemptedAt,
                marksObtained,
                totalMarks : questionPaper.totalMarks,
                correctlySolved : count,
                totalQuestions : questionArr.length
			})

            console.log(testArray);

			await userRef.update({
				testHistory : testArray
			})
            
        }
        catch(err)
        {
            console.log(err)
        }

        history.push("/")
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
                        answerMap={answerMap}
                        submitAnswer={submitAnswer}
                        time={questionPaper.seconds}
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
                                ({questionPaper.questionsList[questionSelected].qno}) {questionPaper.questionsList[questionSelected].question} <b>[Marks : {questionPaper.questionsList[questionSelected].marks}]</b>
                            </div>

                            {/* <div className="options-box container"> */}
                            <div className="options-box">
                                <OptionsView 
                                    options={questionPaper.questionsList[questionSelected].options}
                                    setSelectedOption={setSelectedOption}
                                    selectedOption={selectedOption}
                                    answerMap={answerMap}
                                    qno={questionSelected}
                                />
                                <div>
                                    <button className="save-btn" onClick={clearSelection}>Clear Selection</button>
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