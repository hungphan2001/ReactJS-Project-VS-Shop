import React, { useEffect, useState } from 'react';
import Header from '../../shared/components/Layout/Header';
import Footer from '../../shared/components/Layout/Footer';
import Slidebar from '../../shared/components/Layout/Slidebar';
import Slider from '../../shared/components/Layout/Slider';
import Menu from '../../shared/components/Layout/Menu';
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const Home = () => {

    const [latestProduct,setLatestProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);

    useEffect(()=>{
       //Set Latest Product
       getProducts({
        params:{limit :6}
       }).then(({data})=>{
        setLatestProduct(data.data.docs)
       });

       //Set Features products
       getProducts({
        params:{
            limit:6,
            "filter[is_featured]": true,
        },
       }).then(({data})=>{
        setFeaturedProduct(data.data.docs);
       })
    },[])
    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                    <h3>Sản phẩm nổi bật</h3>
                    <div className="product-list card-deck">
                            {
                                featuredProduct.map((product)=>{
                                return <ProductItem key={product._id} item={product}/>})
                            }
                    </div>
                </div>
                {/*	End Feature Product	*/}
                {/*	Latest Product	*/}
                <div className="products">
                    <h3>Sản phẩm mới</h3>
                    <div className="product-list card-deck">
                        {
                            latestProduct.map((product)=>{
                                return <ProductItem key={product._id} item={product}/>
                            })
                        }
                    </div>
                </div>
                {/*	End Latest Product	*/}
        </>
    )
}

export default Home;