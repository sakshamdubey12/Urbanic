import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Account from './components/Account';

function App() {
  return (
    <div>
      <Header />
      {/* <Router> */}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    {/* </Router> */}
    </div>
    
  
  );
}

export default App;
