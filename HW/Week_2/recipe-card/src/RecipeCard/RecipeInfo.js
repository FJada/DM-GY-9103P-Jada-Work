import React from'react'

export default function RecipeInfo(props){
    const {title, description} = props
    return (
        <div>
            <h1 className='card_title'>{title}</h1>
            <p className='card_description'>{description}</p>
        </div>
    )
}