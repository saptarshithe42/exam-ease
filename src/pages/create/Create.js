import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { projectFirestore, timestamp } from '../../firebase/config'

//styles
import "./Create.css"

// components
import MCQInput from './MCQInput'
import Sidebar from '../../components/Sidebar'




export default function Create() {

	const { user } = useAuthContext()
	const history = useHistory()

	const [questionPaperName, setQuestionPaperName] = useState("")
	const [numberOfQuestions, setNumberOfQuestions] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [firstFormSubmitted, setFirstFormSubmitted] = useState(false)
	const [enteredQuestions, setEnteredQuestions] = useState(1)
	const [questionsList, setQuestionsList] = useState([])

	const convertToNum = (numString) => {
		setNumberOfQuestions(parseInt(numString))
	}

	const convertToSec = (minString) => {
		setMinutes(parseInt(minString))
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

		const createdAt = timestamp.fromDate(new Date())

		let totalMarks = 0

		questionsList.forEach((question) => {
			totalMarks += Number(question.marks)
		})

		const questionPaper = {
			questionsList,
			createdBy: user.uid,
			name : questionPaperName,
			createdAt,
			seconds: (minutes * 60),
			totalMarks
		}

		try {

			// adding the question paper
			const addedQuestionPaper = await projectFirestore.collection("question_papers").add(questionPaper)
			const userRef = projectFirestore.collection("users").doc(user.uid);

			let qpArray = (await userRef.get()).data().questionPaperIDs


			qpArray.push({id : addedQuestionPaper.id, 
				name : questionPaperName,
				createdAt
			})
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
							<span>Question paper name : </span>
							<input
								required
								type="text"
								onChange={(e) => setQuestionPaperName(e.target.value)}
								value={questionPaperName}
							/>
						</label>

						<label>
							<span>Enter number of questions : </span>
							<input
								required
								type="Number"
								onChange={(e) => convertToNum(e.target.value)}
								value={numberOfQuestions}
								min={0}
								className="numInput"
							/>
						</label>

						<label>
							<span>Enter time in minutes : </span>
							<input
								required
								type="Number"
								onChange={(e) => convertToSec(e.target.value)}
								value={minutes}
								min={0}
								className="numInput"
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
