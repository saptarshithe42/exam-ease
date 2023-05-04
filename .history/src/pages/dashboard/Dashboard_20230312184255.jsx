import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './Dashboard.css'

// components
import Sidebar from "../../components/Sidebar";
import QuestionPaperList from "../../components/QuestionPaperList";



export default function Dashboard() {

	const { user } = useAuthContext()
	const [questionPaperArray, setQuestionPaperArray] = useState([])
	const userRef = projectFirestore.collection("users").doc(user.uid);

	const getQuestionPaperArr = async () => {

		// fetching questionPaperIDs array from user's document
		let qpArray = (await userRef.get()).data().questionPaperIDs
		setQuestionPaperArray(qpArray)
	}

	useEffect(() => {
		getQuestionPaperArr()
		console.log("fetching")

	}, [questionPaperArray.length])


	// function to delete a question paper
	const deletePaper = async (id) => {
		// console.log(id);

		try {
			const questionsRef = projectFirestore.collection("question_papers")
			const reportRef = projectFirestore.collection("reports")

			// deleting the question paper
			await questionsRef.doc(id).delete()
			// deleting corresponding report entry
			await reportRef.doc(id).delete()
			

			// now deleting the id entry from the users document (questionPaperIDs field)
			const userRef = projectFirestore.collection("users").doc(user.uid)

			const newArr = questionPaperArray.filter((questionPaper) => {
				return (questionPaper.id !== id)
			})

			// setting updated array as users questionPaperIDs array
			await userRef.update({
				questionPaperIDs: newArr
			})

			setQuestionPaperArray(newArr) // update UI
		}
		catch (err) {
			console.log(err);
		}


	}


	return (
		<div className="dashboard">
			{user && <Sidebar />}
			<div className="question-div">
				{(questionPaperArray.length != 0) &&
					<QuestionPaperList
						questions={questionPaperArray}
						deletePaper={deletePaper}
					/>}
			</div>
		</div>
	)
}
