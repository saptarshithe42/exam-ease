import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import { useMemo } from 'react';

// styles
import "./ExamSidebar.css"

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Countdown from './Countdown';

function ExamSidebar(props) {

    const { user } = useAuthContext()

    const { numberOfQuestions, updateSelectedQuestion, answerMap, submitAnswer, time} = props

    var questionNumberArr = Array.from(Array(numberOfQuestions).fill(), (_, i) => {
        return {
            sno: i + 1,
            style: {
                color: "white",
                backgroundColor: "red",
                borderRadius: "100%",
                width: "10%",
                textAlign: "center",
                height : "10%",
                border: "1rem",
                borderColor : "white"

            }
        }
    });

    // console.log(questionNumberArr)
    // console.log("questions : " + numberOfQuestions);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [questionSelected, setQuestionSelected] = useState(1)

    return (
        <div
            style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="#fff" backgroundColor="#333" toggled={sidebarCollapsed}>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>}>
                    <a
                        href="/"
                        className="text-decoration-none"
                        style={{ color: 'inherit' }}
                    >
                        {user.displayName}
                    </a>
                    <br />
                    <Countdown 
                        examDuration={time}
                        onTimerEnd={submitAnswer}
                    />
                </CDBSidebarHeader>
                <CDBSidebarContent className="exam-sidebar-content">
                    {!sidebarCollapsed && 
                    
                        <div className="question-selector-div">
                        {questionNumberArr.map((question) => {
                            return (<div style={question.style} key={question.sno} 
                            onClick={() => updateSelectedQuestion(question.sno-1)}>
                            {question.sno}</div>)
                        })}
                    </div>}
                    {!sidebarCollapsed && 
                    <button className="submit-btn" onClick={submitAnswer}>Submit</button>}
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    )
}

export default ExamSidebar