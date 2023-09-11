import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({colorChoices,id, name, image, price}) {
  return (

      <div key={id} className='card'>
        <Link to={`/product/${id}`}>
        <div className='img'>
          <img style={{"height":"100%", "width":"100%"}} src={image} alt="" />
        </div>
        <div className='card-body'>
          <div className='m-2'>{name.substring(0, 35)}</div>
          <div className='m-2'>₹{price}</div>
          <div className='m-2 colors-choice'>
            {
              colorChoices.map(color =>{
                // console.log(color)
                return(
                  <div style={{"backgroundColor":`${color}`}} className="color"></div>
                )
                
              })
            }
            {/* <div className="color active-color"></div>
            
            <div className="color"></div> */}
          </div>
        </div></Link>
      </div>
  )
}
