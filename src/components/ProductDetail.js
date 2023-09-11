import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header';
import products from '../data/data.json';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetail({id}) {
//   const products_ = useSelector((state) => state.products); 
  const dispatch = useDispatch();

  const { productId } = useParams();
  const [size, setSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.items.find((item) => item.id === productId);
  const handleAddtoBag = ()=>{
    if (size && selectedColor){
      dispatch(addToCart({product,size,selectedColor}))

      toast.success('Added to Bag', {
        position: 'top-right',
        autoClose: 3000, // Auto-close the popup after 3 seconds
      });
    }

    else{
      toast.info('Select size and Color!', {
        position: 'top-right',
        autoClose: 3000, // Auto-close the popup after 3 seconds
      });
    }
    
  }

  const getSelectedSize = ()=>{
    const sizeSelect = document.getElementById("sizeSelect");
    const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    setSize(selectedOption.value)
  }

  const selectColor = (payload)=>{
    setSelectedColor(payload); 
  }

 

 
  

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className='detail-body' style={{"marginTop":"100px"}}>
      <img style={{'height':"800px"}} src={product.imageUrl} alt={product.name} />
      <div className='detail'>
        <h1 style={{"fontSize":"60px"}}>{product.name}</h1>
        <p style={{"fontSize":"25px", "color":"gray"}}><b style={{"fontSize":"40px", "color":"black"}}>MRP ₹{product.price} </b> Incluive of all taxes</p>
        <div className='' style={{"fontSize":"25px"}}>COLOR: <b style={{"color":"gray"}}>Beige</b>  </div>
        <div className='detail-ele colors-choice'>
            {
              product.colorChoices.map(color =>{
                return(
                  <div 
                    onClick={()=>selectColor(color)} 
                    key={color}  
                    style={{"backgroundColor":`${color}`}} 
                    className={`color ${selectedColor === color ? 'active-color' : ''}`}>
                  </div>
                )
              })
            }
        </div>
        {/* <div style={{"color":"beige"}} className='color detail-ele'>
            {

            }    
        </div> */}

        <select onChange={()=>getSelectedSize()} id="sizeSelect" className='button-1' >
            <option style={{"display":"none"}} value="">SELECT SIZE</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
        </select>
        
          <div onClick={() => handleAddtoBag()} className='button-2'>ADD TO BAG</div>
         
        
        
        <div className='' style={{"fontSize":"18px", "marginTop":"70px"}}>DELIVERY INFO </div>
        <div style={{"width":"100%"}} className='detail-body pin info'>
            <div className='info-1'>
                Enter a pincode to check
            </div>
            <button type="button" className='info-2'>
                Check
            </button>
        </div>
        <details>
            <summary className='detail-ele'>SERVICE & POLICY</summary>
                <div>
                    Cash on delivery available in most areas
                    Free shipping on this product! (saving ₹99)
                    10 days easy returns with free pick up
                </div>
                <div className='detail-ele'>View more about Service&Policy</div>
                <div>Contact Customer Service if you need any help</div>
        </details>
        <hr />
        <details>
            <summary className='detail-ele'>ABOUT THIS PRODUCT</summary>
                <div>
                    Cash on delivery available in most areas
                    Free shipping on this product! (saving ₹99)
                    10 days easy returns with free pick up
                </div>
                <div className='detail-ele'>View more about Service&Policy</div>
                <div>Contact Customer Service if you need any help</div>
        </details>
        <hr />
        <details>
            <summary className='detail-ele'>PRODUCT MEASUREMENTS</summary>
                <div>
                    Cash on delivery available in most areas
                    Free shipping on this product! (saving ₹99)
                    10 days easy returns with free pick up
                </div>
                <div className='detail-ele'>View more about Service&Policy</div>
                <div>Contact Customer Service if you need any help</div>
        </details>
        
      </div>
    </div>
  )
}
