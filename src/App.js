import './App.css';
import Header from './Components/Header/Header';
import Products from './Components/Products/Products';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './Components/Cart/Cart';
import SignUp from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={ <Login/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
