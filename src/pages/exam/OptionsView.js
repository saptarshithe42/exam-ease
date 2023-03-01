import React from 'react'



function OptionsView({options, setSelectedOption, selectedOption}) {

    const activeOption = { backgroundColor: "yellow" }

    return (
        <div>
            {options.map((option, index) => {
                return (
                    <div key={index}
                        className="option"
                        onClick={() => setSelectedOption(index)}
                        style={selectedOption === (index) ? activeOption : null}
                    >
                        ({index + 1}) {option}
                    </div>)
            })}
        </div>
    )
}

export default OptionsView