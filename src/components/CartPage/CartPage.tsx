import React, { useState, useEffect } from "react";
import "./CartPage.css";
import { IoClipboardOutline } from "react-icons/io5";
import { IoGiftOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoPricetagsOutline } from "react-icons/io5";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  mainImg: string;
  size: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [warningMessage, setWarningMessage] = useState<string>("");

  useEffect(() => {
    // Retrieve cart data from localStorage and set it to state
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  const handleQuantityChange = (index: number, change: number) => {
    const newCartData = [...cartData];
    newCartData[index].quantity += change;

    if (newCartData[index].quantity > 5) {
      setWarningMessage("Warning: Quantity cannot exceed 5.");
      newCartData[index].quantity = 5;
    } else if (newCartData[index].quantity < 1) {
      newCartData.splice(index, 1);
    } else {
      setWarningMessage("");
    }

    setCartData(newCartData);
    localStorage.setItem("cartData", JSON.stringify(newCartData));
  };

  const calculateTotalPrice = (item: CartItem) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-sidebar">
      <span> Your Cart</span>
      {cartData.length === 0 ? (
        <div className="EmptyCart">
          <p>Your cart is empty.</p>
          <img
            src="https://blogzine.webestica.com/assets/images/icon/empty-cart.svg"
            alt=""
          />
        </div>
      ) : (
        <div className="Cart">
          {cartData.map((item, index) => (
            <div key={`${item.productId}-${item.size}`} className="CartMain">
              <div className="cart-item">
                <img
                  src={item.mainImg}
                  alt={item.title}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${calculateTotalPrice(item)}</p>
                  <div className="QuantityBox">
                    <button onClick={() => handleQuantityChange(index, -1)}>
                      -
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(index, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {warningMessage && <div className="warning">{warningMessage}</div>}
        </div>
      )}
      <div className="CartIcons">
        <IoClipboardOutline />
        <IoPricetagsOutline />
        <LiaShippingFastSolid />
        <IoGiftOutline />
      </div>
      <div className="CartTotal">
        <div>TOTAL :</div>
        <div> 500 </div>
      </div>
      <div className="CheckOutButton">
        <div className="agriment">
          <span>Tax included and shipping calculated at checkout</span>
          <div className="chk">
            {" "}
            <input type="checkbox" />{" "}
            <span>I agree withTerms & Conditions</span>
          </div>
        </div>
        <button> CHECK OUT </button>
      </div>
    </div>
  );
};

export default CartPage;
