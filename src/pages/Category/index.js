import React, { useEffect, useState } from 'react'
import { getProductsCategory,getCategory } from '../../services/Api';
import { useParams } from 'react-router-dom';
import ProductItem from '../../shared/components/product-item';
const Category = () => {
  const {id} = useParams();
  const [products,setProducts] = useState([]);
  const [totalproducts,setToTalProducts] = useState(0);
  const [categories,setCategores] = useState(null);
  useEffect(()=>{
   getProductsCategory(id,{}).then(({data})=>{
    setProducts(data.data.docs);
    setToTalProducts(data.data.docs.length);
   });
   getCategory(id,{}).then(({data})=>{
    setCategores(data.data);
   })

  },[id])
  return (
    <>

      {/*	List Product	*/}
      <div className="products">
        <h3>{categories?.name} (Hiện có {totalproducts} sản phẩm)</h3>
<div  className="product-list card-deck">
	{
		products?.map((product)=>{
			return <ProductItem key={product._id} item={product}/>
		})
	}
</div>


      </div>
      {/*	End List Product	*/}

      <div id="pagination">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
    <li className="page-item active"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
  </ul> 
</div>



    </>
  )
}

export default Category