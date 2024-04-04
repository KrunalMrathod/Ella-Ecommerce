import { SlBag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import "./TopNav.css"


const TopNav = () => {
  return (
    <div className="TopNav" >
      <div className="NavLeft">
        <div className="LogoDiv">
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/files/ella-logo-black-compressor.png?v=1629858814&width=300"
            alt="Ella"
          />
        </div>
      </div>
      <div className="NavRight">
        <div className="TopLinks">
          <div className="CartDiv">
            <div className="cartIcons">
              <SlBag />
            </div>
            <div className="cartText">
              <span>Shopping Cart</span>
            </div>
            <div className="cartCount">
              <span>0</span>
            </div>
          </div>
          <div className="WishListDiv">
            <div className="WishIconsDiv">
              <CiHeart />
            </div>
            <div className="wishText">
              <span>My Wish List</span>
            </div>
          </div>
          <div className="accountDiv">
            <span>Sign in or Create an Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
