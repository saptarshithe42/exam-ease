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

					questions.map((questionPaper) => {

						return (
							<div key={questionPaper.id} className="col" 
							style={{display : "flex", 
							justifyContent : "center",
							padding : "2rem"}}>

								<Card style={{ width: '16rem' }}>
									<Card.Body>
										<Card.Title>{questionPaper.name}</Card.Title>
										<Card.Text>
											{formatDistanceToNow((questionPaper.createdAt).toDate(), { addSuffix: true })}
										</Card.Text>
										<div style={{ display: "flex", justifyContent: "space-between" }}>
											<Link to={`/questionpaper/${questionPaper.id}`} key={questionPaper.id}>
												<Button variant="primary">View</Button>
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