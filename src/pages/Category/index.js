import React, { useEffect, useState } from 'react'
import { getProductsCategory,getCategory } from '../../services/Api';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductItem from '../../shared/components/product-item';
import Pagination from '../../shared/components/Pagination';
const Category = () => {
  const {id} = useParams();
  const [products,setProducts] = useState([]);
  const [totalproducts,setToTalProducts] = useState(0);
  const [categories,setCategores] = useState(null);
  const [pages,setPages]=useState({
    limit:12,
  });
  const [searchParams,setSearchParams]= useSearchParams();
  const page = searchParams.get("page") ||1;
  useEffect(()=>{
   getProductsCategory(id,{
    params:{
      page:page,
        limit:12,
    }
   }).then(({data})=>{
    setProducts(data.data.docs);
    setToTalProducts(data.data.docs.length);
    setPages({...pages,...data.data.pages})
   });
   getCategory(id,{}).then(({data})=>{
    setCategores(data.data);
   })

  },[id,page])
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
  <Pagination pages={pages}/>
</div>



    </>
  )
}

export default Category