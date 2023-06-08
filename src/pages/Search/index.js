import React, { useEffect, useState } from 'react'
import ProductItem from '../../shared/components/product-item'
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/Api'; 
import Pagination, {formatUrl,renderPagesHTML} from '../../shared/components/Pagination';
const Search = () => {
  const [products,setProducts]= useState([]);
  const [pages,setPages] =useState({
   limit:12,
  
  });
  const [searchParams,setSearchParams] = useSearchParams();
  const keyword= searchParams.get("keyword");
  const page = searchParams.get("page") ||1;
  useEffect(()=>{
    getProducts({
      params:{
        name:keyword,
        page:page,
        limit:12,
      }
    }).then(({data})=>{
      setProducts(data.data.docs)
      setPages({...pages,...data.data.pages})
    })
  },[keyword,page])

  return (
    <>
    <div>
  {/*	List Product	*/}
  <div className="products">
    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
    <div className="product-list card-deck">
      {
        products.map((item,index)=>{
          return(<ProductItem key={index} item={item}/>)
        })
      }
    </div>
  </div>
  {/*	End List Product	*/}
  <div id="pagination">
     <Pagination pages={pages}></Pagination>
  </div>
</div>

    </>
  )
}

export default Search