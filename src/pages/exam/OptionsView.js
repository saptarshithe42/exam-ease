import React from 'react'
import { useState } from 'react'


function OptionsView(props) {

    let {options, setSelectedOption, selectedOption, answerMap, qno} = props

    const activeOption = { backgroundColor: "yellow" }

    // console.log("OptionsView.js rendered")

    return (
        <div>
            {options.map((option, index) => {
                return (
                    <div key={index}
                        className="option"
                        onClick={() => setSelectedOption(index)}
                        style={(selectedOption === (index) || (answerMap.has(qno) ? (index === answerMap.get(qno)) : null)) ? activeOption : null}
                    >
                        ({index + 1}) {option}
                    </div>)
            })}
        </div>
    )
}

export default OptionsView