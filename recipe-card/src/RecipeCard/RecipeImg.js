import React from "react"
import './styles.css'

export default function RecipeImg(props){
    const {imgSrc} = props
    return <img src= {imgSrc} className="card_img"/>
}