import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import BottomNav from "./components/BottomNav/BottomNav";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import CartPage from "./components/CartPage/CartPage";
import {
  NewArrivals,
  TrendingNow,
  FeaturedOnElla,
  AllDataOnElla,
} from "./db/Database";
import AllProducts from "./components/AllProducts/AllProducts";
import SingleProducts from "./components/SingleProducts/SingleProducts";

interface LayoutProps {
  onCartIconClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onCartIconClick }) => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("NewArrivals", JSON.stringify(NewArrivals));
    localStorage.setItem("TrendingNow", JSON.stringify(TrendingNow));
    localStorage.setItem("FeaturedIn", JSON.stringify(FeaturedOnElla));
    localStorage.setItem("AllProducts", JSON.stringify(AllDataOnElla));

    const handleScroll = () => {
      const currentScrollPos: number = window.scrollY;
      const isScrollingDown: boolean = currentScrollPos > prevScrollPos;

      if (isScrollingDown && currentScrollPos > 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, sticky]);

  return (
    <div className="App">
      <TopNav onCartIconClick={onCartIconClick} />
      <div className={`BottomNavMain ${sticky ? "sticky" : ""}`}>
        <BottomNav />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  interface CartItem {
    productId: string;
    title: string;
    price: number;
    mainImg: string;
    size: string;
    quantity: number;
  }

  const addToCart = (
    productId: string,
    title: string,
    price: number,
    mainImg: string,
    size: string,
    quantity: number
  ) => {
    const cartData: CartItem[] = JSON.parse(
      localStorage.getItem("cartData") || "[]"
    );
  
    const existingItemIndex = cartData.findIndex(
      (item: CartItem) => item.productId === productId && item.size === size
    );
  
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity += quantity;
    } else {
      const newCartItem: CartItem = {
        productId,
        title,
        price,
        mainImg,
        size,
        quantity,
      };
      cartData.push(newCartItem);
    }
  
    localStorage.setItem("cartData", JSON.stringify(cartData));
    toggleCart();
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout onCartIconClick={toggleCart} />}>
            <Route index element={<Body />} />
            <Route path="/allProducts" element={<AllProducts />} />
            <Route
              path="allProducts/singleProduct/:productId"
              element={<SingleProducts onAddToCart={addToCart} />}
            />
          </Route>
        </Routes>
        {showCart && (
          <div
            ref={cartRef}
            className={`cart-sidebar ${showCart ? "open" : ""}`}
          >
            <CartPage />
            <button onClick={toggleCart}>Close</button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
