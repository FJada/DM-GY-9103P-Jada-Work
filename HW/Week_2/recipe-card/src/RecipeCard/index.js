import React from 'react'
//import RECIPE_IMG from '../assets/Best-Banana-Nut-Bread-Recipe.jpg'

import { RECIPE } from './recipe-data'
import RecipeInfo from './RecipeInfo'
import RecipeImg from './RecipeImg'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import Card from './Card'
import './styles.css'

//<img src={RECIPE_IMG} alt="Banana nut bread" />

export default function RecipeCard() {
    return (
        <Card>
            <RecipeImg imgSrc={RECIPE.imgSrc} />
            <div>
                <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
                <IngredientsList ingredients={RECIPE.ingredients} />
                <InstructionsList instructions={RECIPE.instructions} />
            </div>

        </Card>
    )

}

// function Card(props){
//     return <div className="card"> {props.children}</div>
// }

// function RecipeImg(props){
//     const {imgsrc} = props
//     return <img src= {imgsrc} />
// }

// function RecipeInfo(props){
//     const {title, description} = props
//     return (
//         <div>
//             <h3>{title}</h3>
//             <p>{description}</p>
//         </div>
//     )
// }

// function IngredientsList(props){
//     const{ingredients} = props
//     return (
//         <div>
//             <h3>Ingredients</h3>
//             <ul>
//                 {ingredients.map((ingred, index) => (
//                     <ul key={index}> {ingred}</ul>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// function InstructionsList(props) {
//     const { instructions } = props
//     return (
//         <div>
//             <h3>Instructions</h3>
//             <ol>
//                 {instructions.map((i, index) => (
//                     <li key={index}>{i}</li>
//                 ))}
//             </ol>
//         </div>
//     )
// }