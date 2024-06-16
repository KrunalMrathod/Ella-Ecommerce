import { useEffect, useState } from "react";
import "./Body.css";
import NewArrivals from "../NewArrivals/NewArrivals.tsx"
import TrendingNow from "../TrendingNow/TrendingNow.tsx";
import FeaturedIn from "../FeaturedIn/FeaturedIn.tsx";



const Body = () => {
  const [mobileBanner, setMobileBanner] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [bannerScale, setBannerScale] = useState(1);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
   
    const handleResize = () => {
      const isMobile = window.innerWidth <= 460;
      setMobileBanner(isMobile);
    };

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos < 0.8 * window.innerHeight) {
        setScrollDirection(currentScrollPos > scrollPos ? "down" : "up");
        setScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  useEffect(() => {
    setBannerScale(scrollDirection === "down" ? 1.1 : 1);
  }, [scrollDirection]);

 
  return (
    <div className="Body">
      <div className="FirstBanner" style={{ overflow: "hidden" }}>
        <div
          style={{
            transform: `scale(${bannerScale})`,
            transition: `transform 2s ease-in-out`,
          }}
        >
          {mobileBanner ? (
            <img
              src="//new-ella-demo.myshopify.com/cdn/shop/files/slide1-mb-min.jpg?v=1661416101&width=750"
              alt=""
              style={{ width: "100%" }}
            />
          ) : (
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/slideshow-1.jpg?v=1632195167&width=1880"
              alt=""
              style={{ width: "100%" }}
            />
          )}
        </div>

        <div className="BannerText">
          <div className="BodyHead">
            <span>COSMOPOLIS</span>
          </div>
          <div className="hr"></div>
          <div className="bodyDesc">
            <span>
              Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
              lacus meleifend menean diverra loremous.
            </span>
          </div>
          <div className="bodyButton">
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>

      <div className="TopBoxContainer">
        <div className="TopThree">
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/files/1_257d98ae-1c96-4fdd-b3ea-8439950530cb_370x.jpg?v=1630924167"
            alt=""
          />
          <span>Editor's pick</span>
        </div>
        <div className="TopThree">
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/files/2_987fd332-b977-48d4-9e91-aaf5bf9e372e_370x.jpg?v=1630924187"
            alt=""
          />
          <span>Shoes</span>
        </div>
        <div className="TopThree">
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/files/3_006e87f5-cb50-4183-81b9-0c6f16774ff5_370x.jpg?v=1630924212"
            alt=""
          />
          <span>Accessories</span>
        </div>
      </div>

      <NewArrivals />

      <div className="SecondBanner" style={{ overflow: "hidden" }}>
        <div
          style={{
            transform: `scale(${bannerScale})`,
            transition: `transform 2s ease-in-out`,
          }}
        >
          {mobileBanner ? (
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-1-mb-min.jpg?v=1632459215&width=550"
              alt=""
              style={{ width: "100%" }}
            />
          ) : (
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-1-compressor.jpg?v=1632456769&width=2000"
              alt=""
              style={{ width: "100%" }}
            />
          )}
        </div>

        <div className="BannerText">
          <div className="BodyHead">
            <span>METROPÓLIS</span>
          </div>
          <div className="hr"></div>
          <div className="bodyDesc">
            <span>
            Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo lacus meleifend menean diverra loremous.
            </span>
          </div>
          <div className="bodyButton">
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>
      <TrendingNow/>
      <FeaturedIn/>
    </div>
  );
};

export default Body;
