import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../../services/Api";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import {
  updateCart,
  removeCart,
  deleteCart,
  selectItemCart,
} from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const onChangeOrderInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const cart = useSelector(({ cart }) => cart?.items);

  const onChangeInput = (e, id) => {
    const value = parseInt(e.target.value);
    console.log(value);
    if (value <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Xóa sản phẩm trong giỏ hàng");
      return isConfirm ? dispatch(deleteCart(id)) : (value = 1);
    }
    dispatch(updateCart({ _id: id, qty: value }));
  };

  const onDeleteItem = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Xóa sản phẩm trong giỏ hàng");
    return isConfirm ? dispatch(deleteCart(id)) : false;
  };

  function onClickOrder(e, id) {
    e.preventDefault();

    const items = cart?.map((item) => ({ prd_id: item._id, qty: item.qty }));
    order({
      items,
      ...inputs,
    }).then(({ data }) => {
      if (data.status === "success") {
        dispatch(removeCart());
        navigate("/success");
      }
    });
  }

  return (
    <>
      <div>
        {/*	Cart	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {cart?.map((item, index) => {
              return (
                <div className="cart-item row" key={index}>
                  <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <img src={getImageProduct(item?.image)} />
                    <input
                      type="checkbox"
                      name="selected"
                      id="selected"
                      checked={item.isCheck}
                      onChange={() => dispatch(selectItemCart(item._id))}
                    ></input>
                    <h4>{item?.name}</h4>
                  </div>
                  <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                    <input
                      type="number"
                      id="quantity"
                      className="form-control form-blue quantity"
                      value={item?.qty}
                      min={0}
                      onChange={(e) => onChangeInput(e, item?._id)}
                    />
                  </div>
                  <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                    <b>
                      {formatPrice.format(
                        item?.price * item?.qty ? item?.price * item?.qty : 0
                      )}
                    </b>
                    <a onClick={(e) => onDeleteItem(e, item?._id)} href="#">
                      Xóa
                    </a>
                  </div>
                </div>
              );
            })}
            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <button
                  id="update-cart"
                  className="btn btn-success"
                  type="submit"
                  name="sbm"
                >
                  Cập nhật giỏ hàng
                </button>
              </div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>
                  {formatPrice.format(
                    cart.reduce((total, item) => {
                      if(item.isCheck){
                       return total + item.price * item.qty;
                      }
                      return total;
                    }
                    ,0)
                  )}
                </b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={onChangeOrderInput}
                  value={inputs?.name || ""}
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  onChange={onChangeOrderInput}
                  value={inputs?.phone || ""}
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={onChangeOrderInput}
                  value={inputs?.email || ""}
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  onChange={onChangeOrderInput}
                  value={inputs?.address || ""}
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#" onClick={onClickOrder}>
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default Cart;
