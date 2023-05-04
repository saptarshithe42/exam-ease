import React from 'react'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


// components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// icons
import { MdOutlineContentCopy } from "react-icons/md"

function QuestionPaperList({ questions, deletePaper }) {



	return (
		<div className="question-list container">
			<div className="row">
				{/* <div> */}
				{(questions.length != 0) &&

					questions.map((questionPaper, index) => {

						return (
							<div key={index} className="col"
								style={{
									display: "flex",
									justifyContent: "center",
									padding: "2rem"
								}}>

								{/* <Card>
									<Card.Body>
										<Card.Title>{questionPaper.name}</Card.Title>
										<Card.Text>
											{formatDistanceToNow((questionPaper.createdAt).toDate(), { addSuffix: true })}
										</Card.Text>
										<Card.Text>
											Paper code : 
											{questionPaper.id}
										</Card.Text>
										<MdOutlineContentCopy /> */}
								{/* <div>Paper code : {questionPaper.id}</div> */}
								{/* <div style={{ display: "flex", justifyContent: "space-between" }}>
											<Link to={`/questionpaper/${questionPaper.id}`}>
												<Button variant="primary">View</Button>
											</Link>

											<Link to={`/reports/${questionPaper.id}`}>
												<Button variant="primary">Analysis</Button>
											</Link>
											<Button variant="primary" onClick={() => deletePaper(questionPaper.id)}>Delete</Button>
										</div> */}
								{/* </Card.Body>
								</Card> */}


								<div class="card">
									<h5 class="card-header">Featured</h5>
									<div class="card-body">
										<h5 class="card-title">Special title treatment</h5>
										<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
										<a href="#" class="btn btn-primary">Go somewhere</a>
									</div>
								</div>

							</div>)
					})
				}

			</div>
		</div>
	)
}

export default QuestionPaperList