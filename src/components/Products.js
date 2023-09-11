import SingleProduct from './SingleProduct'
import React, { useState,useEffect} from 'react'

export default function Products({data}) {   
  // console.log(data)
  const items = ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a']
  
  return (
    <div className='products'>  
    {
      data.map((item) =>{
        
        return(
          // <>
          // 
          <SingleProduct colorChoices={item.colorChoices} id={item.id} name={item.name} image={item.imageUrl} price={item.price}  />
          // </>
        )
      })
    }      
    </div>
  )
}
