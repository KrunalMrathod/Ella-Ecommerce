import React, { useState, useEffect } from "react";
import "./App.css";
import Body from "./components/Body/Body";
import BottomNav from "./components/BottomNav/BottomNav";
import TopNav from "./components/TopNav/TopNav";
import { NewArrivals } from "./db/Database";
import { TrendingNow } from "./db/Database";
import { FeaturedOnElla } from "./db/Database";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("NewArrivals", JSON.stringify(NewArrivals));
    localStorage.setItem("TrendingNow", JSON.stringify(TrendingNow));
    localStorage.setItem("FeaturedIn", JSON.stringify(FeaturedOnElla));

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
      <Body />
      <Footer/>
    </div>
  );
};

export default App;
