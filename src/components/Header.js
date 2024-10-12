import React from 'react'
import { GoSearch } from 'react-icons/go'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import { IoPersonOutline } from 'react-icons/io5'
import { AiOutlineQuestionCircle, AiOutlineClose } from 'react-icons/ai'
import { HiOutlineBars3 } from 'react-icons/hi2'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isMobileActive, setIsMobileActive] = useState(false);

  const toggleNavBar = () => {
    setIsMobileActive((prevState) => !prevState);
  }

  const changeIn = (color) => {
    const drop1 = document.querySelector('.header');
    const dropdown = document.querySelector('.dropdown')
    drop1.style.background = color;
    dropdown.style.background = color;
  }

  const changeOut = () => {
    const drop1 = document.querySelector('.header');
    drop1.style.background = 'white';
  }

  return (
    <div className={isMobileActive ? 'nav mob-active' : 'nav'}>
      <div className='header-mobile'>
        <div>
          <AiOutlineClose onClick={() => toggleNavBar()} name='close-button' className='mob-nav-button-close' />
          <HiOutlineBars3 onClick={() => toggleNavBar()} className='mob-nav-button-open' />
          <Link to='/'> <img className='logo' src={logo} alt="Urbanic" /></Link>
        </div>
        <div>
          <Link to='/cart' className="relative">
            <LiaShoppingBagSolid style={{ fontSize: "40px" }} />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartItems.length}</span>
          </Link>
        </div>
      </div>
      <div className="header">
        <div className='header-start'>
          <Link to='/'> <img className='logo' src={logo} alt="Urbanic" /></Link>
        </div>
        <div className='header-mid header-font'>
          {/* Dropdown menus here */}
          {/* ... */}
        </div>
        <div className="header-end">
          <GoSearch className='icon' />
          <Link to="/account"><IoPersonOutline className='icon' /></Link>
          <div className=''>
            <Link to='/cart' className="relative">
              <LiaShoppingBagSolid className='icon' />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartItems.length}</span>
            </Link>
          </div>
          <AiOutlineQuestionCircle className='icon' />
        </div>
      </div>
    </div>
  )
}
