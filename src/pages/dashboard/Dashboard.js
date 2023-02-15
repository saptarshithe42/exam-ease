import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './Dashboard.css'

// components
import Sidebar from "../../components/Sidebar";




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
		<div className="dashboard container">
			{/* {user && <Sidebar />} */}
			{(questionPaperArray.length != 0) &&
				
				questionPaperArray.map((questionPaper) => {
					
					return (<div key={questionPaper}>{questionPaper}</div>)
				})

			}
		</div>
	)
}
