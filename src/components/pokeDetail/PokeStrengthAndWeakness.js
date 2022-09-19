import React from 'react'
import { images } from '../../assets/images'
const PokeStrengthAndWeakness = ({title, strengthAndWeakness}) => {
  return (
    <div>
    <h3>{title}</h3>
    {strengthAndWeakness.length > 0 ? (
      strengthAndWeakness.map((sw) => {
        return (
          <div className="">
            <img src={images.find((f) => f.name === sw).img} alt={sw}/>
            <p>{sw}</p>
          </div>
        )
      })
    ) : (
      <p>This pokemon has not {title}</p>
    )}
  </div>
  )
}

export default PokeStrengthAndWeakness