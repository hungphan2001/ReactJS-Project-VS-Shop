import { useParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import React, { useEffect, useState } from "react";
import {
  getProduct,
  getProductComments,
  createCommentProduct,
} from "../../services/Api";
import moment from "moment";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productcomments, setProductComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const getComments = (id)=>{
    getProductComments(id).then(({ data }) => {
      setProductComments(data.data.docs);
    });
  } 
  
  useEffect(() => {
    getProduct(id, {}).then(({ data }) => {
      setProduct(data.data);
    });
    getComments(id);
  }, [id]);

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputComment({ ...inputComment, [name]: value });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    createCommentProduct(id,inputComment).then(({data})=>{
      if(data.status==="success"){
        setInputComment(null)
      }
      getComments(id);
    })

  };
  return (
    <div>
      <div>
        {/*	List Product	*/}
        <div id="product">
          <div id="product-head" className="row">
            <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
              <img src={getImageProduct(product?.image)} />
            </div>
            <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
              <h1>{product.name}</h1>
              <ul>
                <li>
                  <span>Bảo hành:</span> 12 Tháng
                </li>
                <li>
                  <span>Đi kèm:</span>
                  {product?.accessories}
                </li>
                <li>
                  <span>Tình trạng:</span> {product?.status ? "Mới" : "Cũ"}
                </li>
                <li>
                  <span>Khuyến Mại:</span> {product?.promotion}
                </li>
                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                <li id="price-number">{product.price}đ</li>
                <li id="status">
                  {product?.is_stock ? "Còn hàng" : "Hết hàng"}
                </li>
              </ul>
              <div id="add-cart">
                <a href="#">Mua ngay</a>
              </div>
            </div>
          </div>
          <div id="product-body" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Đánh giá về {product?.name}</h3>
              {product?.details}
            </div>
          </div>
          {/*	Comment	*/}
          <div id="comment" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h3>Bình luận sản phẩm</h3>
              <form>
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    onChange={onChangeInput}
                    value={inputComment?.name ||""}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="pwd"
                    onChange={onChangeInput}
                    value={inputComment?.email ||""}
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung:</label>
                  <textarea
                    name="content"
                    required
                    rows={8}
                    className="form-control"
                    onChange={onChangeInput}
                    value={inputComment?.content ||""}
                  />
                </div>
                <button
                  onClick={onClickSubmit}
                  type="submit"
                  name="sbm"
                  className="btn btn-primary"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
          {/*	End Comment	*/}
          {/*	Comments List	*/}
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="comment-item">
                {productcomments.map((item, index) => {
                  return (
                    <ul key={item._id}>
                      <li>
                        <b>{item.name}</b>
                      </li>
                      <li>
                        {moment(item.updatedAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </li>
                      <li>{item.content} </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Trang trước
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Trang sau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
