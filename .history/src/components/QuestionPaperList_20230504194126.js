import React from 'react'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// styles
import "./QuestionPaperList.css"


// components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// icons
import { MdOutlineContentCopy } from "react-icons/md"


function QuestionPaperList({ questions, deletePaper }) {


	const copyCodeToClipboard = (code) => {

		navigator.clipboard.writeText(code)

	}



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


								<div className="card" style={{ width: "17rem" }}>
									<h5 className="card-header">{questionPaper.name}</h5>
									<div className="card-body">
										{/* <h5 className="card-title">Special title treatment</h5> */}
										<p className="card-text">{formatDistanceToNow((questionPaper.createdAt).toDate(), { addSuffix: true })}</p>
										<p className="card-text">Paper Code:</p>
										<div className="qp-code-box">
											<div className="qp-code">{questionPaper.id}</div>
											<div className="code-copy-icon">
												<MdOutlineContentCopy
													onClick={() => { copyCodeToClipboard(questionPaper.id) }}
												/>
											</div>
										</div>

										<div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
											<Link to={`/questionpaper/${questionPaper.id}`}>
												<Button variant="primary">View</Button>
											</Link>

											<Link to={`/reports/${questionPaper.id}`}>
												<Button variant="primary">Analysis</Button>
											</Link>
											<Button variant="primary" onClick={() => deletePaper(questionPaper.id)}>Delete</Button>
										</div>
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