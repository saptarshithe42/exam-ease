import React from 'react'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFireStore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

//styles
import "./Create.css"

// components
import MCQInput from './MCQInput'
import Sidebar from '../../components/Sidebar'



export default function Create() {

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

		try {

			// adding the question paper
			const addedQuestionPaper = await projectFirestore.collection("question_papers").add(questionPaper)
			const userRef = projectFirestore.collection("users").doc(user.uid);

			let qpArray = (await userRef.get()).data().questionPaperIDs


			qpArray.push(addedQuestionPaper.id)
			// adding currently created question paper ID in questionPaperIDs array in user document
			await userRef.update({
				questionPaperIDs: qpArray
			})
		}
		catch (error) {
			console.log("Could not update documents.")
		}

		history.push("/")

	}

	return (
		<div className="create">
			{user && <Sidebar />}
			<div className="create-div">
				{!firstFormSubmitted &&
					<form className="create-form">
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

						<button onClick={submitFirstForm} className="btn btn-primary">OK</button>

					</form>}

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
						<button onClick={submitQuestionPaper} className="btn btn-primary">Submit</button>
					</div>
				}
			</div>
		</div>
	)
}
