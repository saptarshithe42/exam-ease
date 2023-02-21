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

		let qpArray = (await userRef.get()).data().questionPaperIDs
		setQuestionPaperArray(qpArray)
	}

	useEffect(() => {
		getQuestionPaperArr()
		console.log("fetching")

	}, [questionPaperArray.length])

	const deletePaper = async (id) => {
		// console.log(id);

		try{
			const questionsRef = projectFirestore.collection("question_papers")

			// deleting the question paper
			await questionsRef.doc(id).delete()

			const userRef = projectFirestore.collection("users").doc(user.uid)

			const newArr = questionPaperArray.filter((questionPaper) => {
				return (questionPaper.id !== id)
			})
			
			// adding currently created question paper ID in questionPaperIDs array in user document
			await userRef.update({
				questionPaperIDs: newArr
			})

			setQuestionPaperArray(newArr)
		}
		catch(err)
		{
			console.log(err);
		}

		
	}


	return (
		<div className="dashboard">

			{/* <div className="row">
				{user && <Sidebar />}
			</div> */}
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
