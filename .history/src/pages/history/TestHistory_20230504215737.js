import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './TestHistory.css'

// components
import Sidebar from "../../components/Sidebar";
import TestHistoryList from "./TestHistoryList"
import LoadingAnimation from "../../components/LoadingAnimation"



export default function TestHistory() {

	const { user } = useAuthContext()
	const [testHistoryArray, setTestHistoryArray] = useState([])
	const userRef = projectFirestore.collection("users").doc(user.uid);

	const getTestHistoryArr = async () => {

		let testArray = (await userRef.get()).data().testHistory
		setTestHistoryArray(testArray)
	}

	useEffect(() => {
		getTestHistoryArr()
		console.log("fetching")

	}, [testHistoryArray.length])


	return (
		<div className="dashboard">
			{user && <Sidebar />}
			<div className="question-div">
				{(testHistoryArray.length != 0) ? <LoadingAnimation /> : 
				<TestHistoryList 
				tests={testHistoryArray}
				 />}
			</div>
		</div>
	)
}
