import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from "../../hooks/useDocument"
import { useReactToPrint } from 'react-to-print';

import "./Report.css"

function Report() {

    const { id } = useParams()

    const { document: report } = useDocument("reports", id)

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        documentTitle: `performance-report-${id}`,
        content: () => componentRef.current,
    })



    return (
        <div className="question-paper">
            <button onClick={handlePrint}>Download Report</button>

            {report &&
                <div style={{ textAlign: "center" }} ref={componentRef}>
                    <h1 style={{ marginTop: "2rem" }}>{report.name}</h1>
                    <h5>Full Marks : {report.totalMarks}</h5>
                    <h5>Total questions : {report.totalQuestions}</h5>
                    <h6>Generated with : Exam Ease®</h6>
                    <div className="table-div">
                        <table>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th>
                                <th>Correct</th>
                                <th>Marks</th>
                            </tr>
                            {report.score_sheet.map((scoreObj) => {
                                return (
                                    <tr key={scoreObj.id}>
                                        <td>{scoreObj.rollno}</td>
                                        <td>{scoreObj.name}</td>
                                        <td>{scoreObj.correctlySolved}</td>
                                        <td>{scoreObj.marksObtained}</td>
                                    </tr>)
                            })}
                        </table>
                    </div>

                </div>
            }
        </div>
    )
}

export default Report;