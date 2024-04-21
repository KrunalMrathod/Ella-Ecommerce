import React, { useState, useEffect } from "react";
import "./App.css";
import Body from "./components/Body/Body";
import BottomNav from "./components/BottomNav/BottomNav";
import TopNav from "./components/TopNav/TopNav";

const App: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
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

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="App">
      <TopNav />
      <div className={`BottomNav ${sticky ? "sticky" : ""}`}>
        <BottomNav />
      </div>
      <Body />
    </div>
  );
};

export default App;
