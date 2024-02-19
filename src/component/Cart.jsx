import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeProduct } from './cartSlice';
import "../styles/cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  useEffect(() => {
    let totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setPrice(totalPrice);
  }, [cart]);

  return (
    <article>
      <h2>React Redux</h2>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.thumbnail} alt="" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h4>{item.title}</h4>
            <br />
            <h4>{item.brand}</h4>
            <p>{item.description}</p>
            <br />
            <h4>{item.category}</h4>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => handleIncrease(item.id)}>+</button>
            <button>{item.quantity}</button>
            <button onClick={() => handleDecrease(item.id)}>-</button>&nbsp;&nbsp;&nbsp;
            <span>$ {item.quantity * item.price}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => handleRemove(item.id)}
              style={{ backgroundColor: 'green', color: 'white' }}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Shipping:</span>
        <span>FREE</span>
      </div>
      <div className="total">
        <span>Total Price:</span>
        <span>$ {price}</span>
      </div>

    </article>

  );
};

export default Cart;
