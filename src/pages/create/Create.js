import React from 'react'
import { useState } from 'react'
import "./Create.css"
import MCQInput from './MCQInput'
import { useFirestore } from '../../hooks/useFireStore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

export default function Create() {

    const { addDocument, deleteDocument, updateDocument, response } = useFirestore("question_papers")
    const { user } = useAuthContext()
    const history = useHistory()

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

    const submitQuestionPaper = async () => {

        const questionPaper = {
            questionsList,
            createdBy: user.uid
        }

        // await addDocument(questionPaper)

        const addedQuestionPaper = await projectFirestore.collection("question_papers").add(questionPaper)

        const docRef = projectFirestore.collection("users").doc(user.uid);

        // Get the document
        docRef.get().then((doc) => {
            if (!doc.exists) {
                console.log("No such document!");
            } else {
                // Get the current array value
                let arrayValue = doc.data().arrayField;

                // Add the new element to the array
                arrayValue.push(addedQuestionPaper.id);

                // Update the document with the new array value
                docRef.update({
                    arrayField: arrayValue
                });
            }
        })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

        // const userRef = projectFirestore.collection("users").doc(user.uid)



        // await userRef.update({ 
        //     questionPaperIDs : userRef.questionPaperIDs.arrayUnion(addedQuestionPaper.id)
        //     // questionPaperIDs : [...userRef.questionPaperIDs, addedQuestionPaper.id]
        // })

        history.push("/")

        // // redirecting user to dashboard if data successfully saved to data
        // if (!response.error) {
        // 	history.push("/")
        // }
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
                    <button onClick={submitQuestionPaper}>Submit</button>
                </div>
            }
        </div>
    )
}
