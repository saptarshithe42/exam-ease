import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from 'react-bootstrap/Card';

function TestHistoryList({tests }) {



	return (
		<div className="question-list container">
			<div className="row">
			{/* <div> */}
				{(tests.length != 0) &&

					tests.map((test) => {

						return (
							<div key={test.id} className="col" 
							style={{display : "flex", 
							justifyContent : "center",
							padding : "2rem"}}>

								<Card >
									<Card.Body>
										<Card.Header>{test.name}</Card.Header>
										{/* <Card.Title>{test.name}</Card.Title> */}
										<Card.Text>
											{formatDistanceToNow((test.attemptedAt).toDate(), { addSuffix: true })}
											<p>Paper code : {test.id}</p>
											<p>Correctly Solved : {test.correctlySolved}</p>
											<p>Total Questions : {test.totalQuestions}</p>
											<p>Marks Obtained : {test.marksObtained} out of {test.totalMarks}</p>
										</Card.Text>
									</Card.Body>
								</Card>

							</div>)
					})
				}

			</div>
		</div>
	)
}

export default TestHistoryList