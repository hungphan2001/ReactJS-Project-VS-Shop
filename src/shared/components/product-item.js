import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { getImageProduct,formatPrice } from "../ultils";
import { getProduct } from '../../services/Api';
import { Link } from "react-router-dom";
const ProductItem = ({item}) => {
    return (
        <div className="product-item card text-center">
            <Link to={`/product/${item._id}`}><img src={getImageProduct(item.image)} /></Link>
            <h4><Link to={`/product/${item._id}`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{formatPrice.format(item.price)}</span></p>
        </div>
    )
}

export default ProductItem;
