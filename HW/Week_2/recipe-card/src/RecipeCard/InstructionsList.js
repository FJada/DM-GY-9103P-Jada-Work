import React from 'react'
export default function InstructionsList(props) {
    const { instructions } = props
    return (
        <div className='instr_list'>
            <h3 className='instr_title'>Instructions</h3>
            <ol>
                {instructions.map((i, index) => (
                    <li key={index}>{i}</li>
                ))}
            </ol>
        </div>
    )
}
