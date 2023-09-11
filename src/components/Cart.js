import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from 'react-icons/ai'
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice';
import {IoIosAddCircleOutline} from 'react-icons/io'
import {LiaShippingFastSolid} from 'react-icons/lia'
import {MdOutlinePayment} from 'react-icons/md'
import {TbTruckReturn} from 'react-icons/tb'
import { toast } from 'react-toastify';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleCheckOut = ()=>{
    dispatch(removeFromCart());

    // Display the "Order Placed" popup
    toast.success('Order Placed', {
      position: 'top-right',
      autoClose: 3000, // Auto-close the popup after 3 seconds
    });
  }
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className='cart'>
      <div className='cart-item'>
        <h2 >My Bag({cartItems.length}) </h2>
          {cartItems.map((item) => (
            <div style={{'display':'flex',"margin":'5px'}} key={item.id}>
              <img style={{'height':"250px"}} src={item.imageUrl} />
              <div>
              <div style={{'color':"grey","width":"400px","marginLeft":"10px","marginBottom":"30px"}}>
                {item.name} 
              </div>
              <div>
                <div style={{'display':'flex',"margin":'5px',"justifyContent":"space-between"}}>
                  <div style={{'display':'flex', }}>
                    <div style={{"backgroundColor":`${item.selectedColor}`,"marginLeft":"5px"}}  className='color'></div>
                    <div style={{"marginLeft":"5px"}}> / {item.size}</div>
                  </div>
                  <div style={{'display':'flex'}} ><AiOutlinePlusCircle onClick={() => dispatch(incrementQuantity(item))} style={{"marginRight":"10px"}} className='icon' /> <b> {item.quantity}</b><AiOutlineMinusCircle onClick={() => dispatch(decrementQuantity(item))} style={{"marginLeft":"10px"}} className='icon' /></div>

                </div>
                

                <div style={{"marginLeft":"10px", "marginTop":"30px"}}><b>₹{item.price}</b>   </div>
                
              </div>
              </div>
            </div>
          ))}
      </div>
      <div style={{"display":"flex","flexDirection":"column","justifyContent":"center"}} className='checkout'>
        
        <h2 >Price Details </h2>
        <div style={{"display":"flex","marginTop":"20px","justifyContent":"space-between"}}>
          <div >Sub Total:</div>
          <div><b>₹{total.toFixed(2)}</b></div>
        </div>
        <div style={{"display":"flex","marginTop":"20px","justifyContent":"space-between"}}>
          <div ><b>TOTAL:</b> </div>
          <div><b>₹{total.toFixed(2)}</b> </div>
        </div>
        <button onClick={()=>handleCheckOut()} style={{"width":"100%","marginTop":"30px","borderRadius":"5px"}} disabled={cartItems.length === 0} className='button-2'>CHECKOUT({cartItems.length})</button>
        <div style={{"textAlign":"center","marginTop":"30px"}}>Do you have a discount coupon? Add in the next step.</div>
        <hr style={{"background":"rgb(216 202 202)","width":"100%","marginTop":"30px"}} />
        <div style={{"marginTop":"28px","display":"flex"}}><LiaShippingFastSolid style={{"fontWeight":"lighter","fontSize":"20px","marginRight":"5px"}}/> <div>Free Shipping for orders ₹990</div> </div>
        <div style={{"marginTop":"28px","display":"flex"}}><MdOutlinePayment style={{"fontWeight":"lighter","fontSize":"20px","marginRight":"5px"}} /><div> Secure Payment & Checkout</div></div>
        <div style={{"marginTop":"28px","display":"flex"}}> <TbTruckReturn style={{"fontWeight":"lighter","fontSize":"20px","marginRight":"5px"}} /> <div> Easy Return , Free Pick Up</div> </div>
      </div>
    </div>
  );
}

export default Cart;
