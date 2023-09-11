import React, { useState,useEffect} from 'react'
// import intro from './assets/intro.mp4';
import filterIcon from '../assets/filter-logo.png'
import {BsChevronDown} from 'react-icons/bs'
import Products from './Products'
import data2 from '../data/data.json'
export default function Body() {  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    fetch("https://fakestoreapi.com/products/category/women's clothing")
    .then(res=>res.json())
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
  },[])

  const items = data2.items
  const products = items
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [filterActive, setFilterActive] = useState(false)
  const [sortActive, setSortActive] = useState(false)

  const filterByColor = () => {
    if (selectedColor) {
      const filtered = products.filter((product) =>
        product.colorChoices.includes(selectedColor)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const filterByCategory = () => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const filterByPriceRange = () => {
    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange;
      // console.log(minPrice,maxPrice)
      const filtered = products.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    filterByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    filterByColor();
  }, [selectedColor]);
  
  useEffect(() => {
    filterByPriceRange();
  }, [selectedPriceRange]);

  const toggleFilter = ()=>{
    
    setFilterActive((prevState) => !prevState);

  }
  const Recommended = ()=>{
    setSortActive((prevState) => !prevState);
    // console.log(sortActive)
  }




  const MouseLeave = ()=>{
    const targetDiv = document.getElementById("targetDiv");
    targetDiv.style.display = "none";
  }

  const handleClick = (event)=>{
    const element = event.target;
    const parentDiv = document.getElementById("targetDiv");
    const childDivs = parentDiv.querySelectorAll(".sort");
    const selected = document.getElementById('selected')

    // console.log(selected.textContent, element.textContent)

    element.addEventListener("click", function() {
      if (element.classList.contains('sort-inactive')){
        childDivs.forEach(function(childDiv) {
          if (childDiv.classList.contains("sort-active"))
              {
                childDiv.classList.remove("sort-active");
              }
          childDiv.classList.add("sort-inactive");
        });
        element.classList.remove('sort-inactive')
        element.classList.add('sort-active')
        selected.textContent = element.textContent
      }
    }) 
  }

  const handleClickCategory = (event)=>{
    if (event.target.tagName === 'LI') {
      const itemValue = event.target.getAttribute('data-value');
      setSelectedCategory(itemValue)
  }
  }

  const handleRange = ()=>{
    const priceRange = document.getElementById('priceRange');
    const selectedRange = document.getElementById('selectedRange');
    selectedRange.textContent = `₹${priceRange.value}`;
    setSelectedPriceRange([1,parseInt(priceRange.value, 10)])
  }

const sortByPriceAscending = (products)=>{
  const sortedProducts = products.slice().sort((a, b) => a.price - b.price)
  setFilteredProducts(sortedProducts)
}

const sortByPriceDescending = (products)=>{
  const sortedProducts = products.slice().sort((a, b) => b.price - a.price);
  setFilteredProducts(sortedProducts)

}

function callBothFunctions1(event) {
  handleClick(event);
  sortByPriceAscending(filteredProducts);
}

function callBothFunctions2(event) {
  handleClick(event);
  sortByPriceDescending(filteredProducts);
}
  

  return (
    <div>
     
      <div className="main-frame">
        <div className='main-frame-head'>
          <div className='filter1'> 
            <img onClick={()=>toggleFilter()} style={{"height":"15px", "width":"20px", "marginRight":"5px"}} src={filterIcon} ></img>  
            <div className='font'>SHOW FILTERS</div>
            
          </div>
          <div className='filter1'>
            <div>
              <div className='font'>SORT BY</div>
              
            </div>
            <div>
              <div className='gray down-arrow' id='selected' onClick={()=>Recommended()}>Recommended</div>
                <div id='targetDiv' onMouseLeave={()=>MouseLeave()} className={sortActive?"dropdown-recommended sort-inactive":"toggle"}>
                    <p className='sort sort-active' onClick={(event)=>handleClick(event)}>Recommended</p>
                    <p className='sort sort-inactive' onClick={(event)=>handleClick(event)}>New Arrivals</p>
                    <p className='sort sort-inactive' onClick={(event)=>callBothFunctions1(event)}>Price: Low to High</p>
                    <p className='sort sort-inactive' onClick={(event)=>callBothFunctions2(event)}>Price: High to Low</p>
                </div>
            </div>
            
            <BsChevronDown />
          </div>
        </div>
        <div className='body'>
          <br />
          <div className={filterActive? 'active-filter left-box': 'left-box' }>
          <details style={{"marginTop":"20px"}} id="categoryDropdown">

              <summary>Category</summary>
              <ul id="itemList">
                  <li className='active' onClick={(event)=>handleClickCategory(event)} data-value="Dress">Dress</li>
                  <li className='active' onClick={(event)=>handleClickCategory(event)} data-value="Top">Top</li>
                  <li className='active' onClick={(event)=>handleClickCategory(event)} data-value="Tshirt">Tshirt</li>
                  <li className='active' onClick={(event)=>handleClickCategory(event)} data-value="Trouser">Trouser</li>
                  <li className='active' onClick={(event)=>handleClickCategory(event)} data-value="Skirt">Skirt</li>
              </ul>
          </details>
          
            <hr />
            <details>
              <summary>Price</summary>
              <br />
              <input onChange={()=>{handleRange()}} style={{"width":"90%", "marginBottom":"10px"}} type="range" id="priceRange" min="1" max="10000" step="1" />
              <p>Range: (₹1-<span id="selectedRange"></span>)</p>

            </details>
            <hr />
            <details>
              <summary>Color</summary>
              <div style={{"marginLeft":"-8px"}} >
                <div style={{"display":"flex","justifyContent":"space-around","marginTop":"10px"}}>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Maroon" style={{"backgroundColor":"maroon"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Green" style={{"backgroundColor":"#006400"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Blue" style={{"backgroundColor":"blue"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Pink" style={{"backgroundColor":"pink"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Yellow"  style={{"backgroundColor":"yellow"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Brown" style={{"backgroundColor":"brown"}} className='color'> </div>
                </div>
                <div style={{"display":"flex","justifyContent":"space-around","marginTop":"10px"}}>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Black" style={{"backgroundColor":"black"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Grey" style={{"backgroundColor":"grey"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="#665135" style={{"backgroundColor":"#665135"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Beige" style={{"backgroundColor":"beige"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="SkyBlue" style={{"backgroundColor":"SkyBlue"}} className='color'> </div>
                  <div onClick={(e) => setSelectedColor(e.target.dataset.value)} data-value="Purple" style={{"backgroundColor":"purple"}} className='color'> </div>
                </div> 
              </div>
            </details>
          </div>
          {
          isLoading?  (
            <div>Loading...</div>
          ) : (
            <div className='right-box'><Products data={filteredProducts}/></div>
          )
          }
          
        </div>
      </div>
    </div>
  )
}
