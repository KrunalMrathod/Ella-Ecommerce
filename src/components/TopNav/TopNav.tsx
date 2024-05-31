import { useState, useEffect } from "react";
import "./TopNav.css";
import { SlBag } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const TopNav = () => {
  const [mobileView, setMobileView] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="TopNav">
      {mobileView ? (
        <div className="MobileDiv">
          <FaBars />
          <IoIosSearch />
          <div className="MobileLogo">
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/ella-logo-black-compressor.png?v=1629858814&width=300"
              alt="Ella"
            />
          </div>
          <FaUser/>
          <SlBag/>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default TopNav;