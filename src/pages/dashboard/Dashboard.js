import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './Dashboard.css'

// components
import Sidebar from "../../components/Sidebar";
import QuestionPaperSelectBox from "../../components/QuestionPaperSelectBox";
import QuestionViewComponent from "../../components/QuestionViewComponent";
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


	return (
		<div className="dashboard">

			{/* <div className="row">
				{user && <Sidebar />}
			</div> */}
			{user && <Sidebar />}
			<div className="question-div">
				{/* {(questionPaperArray.length != 0) &&

					questionPaperArray.map((questionPaper) => {

						return (<div key={questionPaper}>{questionPaper}</div>)
					})

				} */}
				{(questionPaperArray.length != 0) && <QuestionPaperList questions={questionPaperArray} />}
			</div>
		</div>
	)
}
