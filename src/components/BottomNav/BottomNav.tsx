import { useEffect, useState } from "react";
import "./BottomNav.css";

const BottomNav = () => {
  
  const [showNavbar, setShowNavbar] = useState<boolean>(window.innerWidth >= 1025);

  useEffect(()=>{
    const handleResize = () => {
      setShowNavbar(window.innerWidth >= 1025);
    };

    handleResize();

    
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  },[])

  
  return (
    <>
  
 {
  showNavbar &&  ( <div className="BottomNavMain">
  <div className="link" >
    <div className="Links notification" >
      <span>Theme demo</span>
      <div className="Noti">
        <p style={{ backgroundColor: "#06bfe2" }}>New</p>
      </div>
    </div>
    <div className="Links">
      <span>Shop</span>
    </div>
    <div className="Links notification">
      <span>Product</span>
      <div className="Noti">
        <p style={{ backgroundColor: "#ffbb49" }}>Hot</p>
      </div>
    </div>
    <div className="Links">
      <span>blog</span>
    </div>
    <div className="Links">
      <span>pages</span>
    </div>
    <div className="Links">
      <span>new in</span>
    </div>
    <div className="Links">
      <span>trend</span>
    </div>
    <div className="Links">
      <span>collections</span>
    </div>
    <div className="Links">
      <span>buy ella</span>
      <div className="Noti">
        <p style={{ backgroundColor: "#ff1a00" }}>Sale</p>
      </div>
    </div>
  </div>
</div>)
 }
 </>
  );
};

export default BottomNav;
