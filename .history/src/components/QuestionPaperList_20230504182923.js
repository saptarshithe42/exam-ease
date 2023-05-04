import React from 'react'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function QuestionPaperList({ questions, deletePaper }) {



	return (
		<div className="question-list container">
			<div className="row">
			{/* <div> */}
				{(questions.length != 0) &&

					questions.map((questionPaper, index) => {

						return (
							<div key={index} className="col" 
							style={{display : "flex", 
							justifyContent : "center",
							padding : "2rem"}}>

								<Card style={{ width: "20rem" }}>
									<Card.Body>
										<Card.Title>{questionPaper.name}</Card.Title>
										<Card.Text>
											{formatDistanceToNow((questionPaper.createdAt).toDate(), { addSuffix: true })}
										</Card.Text>
										<Card.Text>
											Paper code : {questionPaper.id}
										</Card.Text>
											{/* <div>Paper code : {questionPaper.id}</div> */}
										<div style={{ display: "flex", justifyContent: "space-between" }}>
											<Link to={`/questionpaper/${questionPaper.id}`}>
												<Button variant="primary">View</Button>
											</Link>

											<Link to={`/reports/${questionPaper.id}`}>
												<Button variant="primary">Analysis</Button>
											</Link>
											<Button variant="primary" onClick={() => deletePaper(questionPaper.id)}>Delete</Button>
										</div>
									</Card.Body>
								</Card>

							</div>)
					})
				}

			</div>
		</div>
	)
}

export default QuestionPaperList