import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Import Pages
import Home from '../src/pages/Home'
import Category from '../src/pages/Category'
import ProductDetails from '../src/pages/ProductDetails'
import Cart from '../src/pages/Cart'
import Success from '../src/pages/Success'
import Search from '../src/pages/Search'
import NotFound from '../src/pages/NotFound'

//IMport Layout
import Header from '../src/shared/components/Layout/Header';
import Footer from '../src/shared/components/Layout/Footer';
import Slidebar from '../src/shared/components/Layout/Slidebar';
import Slider from '../src/shared/components/Layout/Slider';
import Menu from '../src/shared/components/Layout/Menu';
function App() {
  return (
    <>
      <BrowserRouter>
        {/*	Header	*/}
        <Header>

        </Header>

        {/*	End Header	*/}

        {/*	Body	*/}
        <div id="body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Menu />
              </div>
            </div>
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                {/*	Slider	*/}
                <Slider />
                {/*	End Slider	*/}
                {/*	Main	*/}
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/category' element={<Category />}></Route>
                  <Route path='/product' element={<ProductDetails />}></Route>
                  <Route path='/cart' element={<Cart />}></Route>
                  <Route path='/success' element={<Success />}></Route>
                  <Route path='/search' element={<Search />}></Route>
                  <Route path='*' element={<NotFound />}></Route>
                </Routes>
                {/*	Main	*/}
              </div>
              <Slidebar />
            </div>
          </div>
        </div>
        {/*	End Body	*/}

        {/*	Footer	*/}
        <Footer />
        {/*	End Footer	*/}

      </BrowserRouter>
    </>
  );
}

export default App;
