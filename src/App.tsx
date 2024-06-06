import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import BottomNav from "./components/BottomNav/BottomNav";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import Cart from "./components/Cart/Cart";
import { NewArrivals, TrendingNow, FeaturedOnElla, AllDataOnElla } from "./db/Database";
import AllProducts from "./components/AllProducts/AllProducts";
import SingleProducts from "./components/SingleProducts/SingleProducts";

const Layout: React.FC = () => {
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
      <TopNav />
      <div className={`BottomNavMain ${sticky ? "sticky" : ""}`}>
        <BottomNav />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Body />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="allProducts/singleProduct/:productId" element={<SingleProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
