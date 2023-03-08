import { useCollection } from "../../hooks/useCollection"
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { projectFirestore } from "../../firebase/config";

// styles
import './TestHistory.css'

// components
import Sidebar from "../../components/Sidebar";
import TestHistoryList from "./TestHistoryList"



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

			{/* <div className="row">
				{user && <Sidebar />}
			</div> */}
			{user && <Sidebar />}
			<div className="question-div">
				{(testHistoryArray.length != 0) && 
				<TestHistoryList 
				tests={testHistoryArray}
				 />}
			</div>
		</div>
	)
}
