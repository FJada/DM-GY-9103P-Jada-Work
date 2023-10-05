import React from 'react'

export default function IngredientsList(props){
    const{ingredients} = props
    return (
        <div className='ingred_list'>
            <h3 className='ingred_title'>Ingredients</h3>
            <ul>
                {ingredients.map((ingred, index) => (
                    <li key={index}> {ingred}</li>
                ))}
            </ul>
        </div>
    )
}