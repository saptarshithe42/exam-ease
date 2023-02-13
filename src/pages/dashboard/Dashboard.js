import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"

// styles
import './Dashboard.css'
import { projectFirestore } from "../../firebase/config";




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
		<div>
			{questionPaperArray &&
				
				questionPaperArray.map((questionPaper) => {
					
					return (<div key={questionPaper}>{questionPaper}</div>)
				})

			}
		</div>
	)
}
