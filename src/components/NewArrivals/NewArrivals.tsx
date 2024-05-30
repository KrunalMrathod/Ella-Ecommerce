import React, { useEffect, useState } from "react";
import "./NewArrivals.css";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

interface OptionalImg {
  id: string;
  img: string;
}

interface NewArrival {
  id: string;
  mainImg: string;
  hoverImg: string;
  title: string;
  startRatings: string;
  soldINHours: string;
  description: string;
  vendor: string;
  sku: string;
  availability: string;
  productType: string;
  price: number;
  left: number;
  Sixe: string[];
  optionalImgs: OptionalImg[];
}

const NewArrivals: React.FC = () => {
  const [newArrivalsData, setNewArrivalsData] = useState<NewArrival[]>([]);
  const [hoveredImage, setHoveredImage] = useState<{ [key: string]: string }>({});
  const [hovered, setHovered] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedNewArrivalsString = localStorage.getItem("NewArrivals");
    let storedNewArrivals: NewArrival[] = [];

    if (storedNewArrivalsString) {
      storedNewArrivals = JSON.parse(storedNewArrivalsString);
      setNewArrivalsData(storedNewArrivals);
    }
  }, []);

  const handleMouseEnter = (id: string, hoverImg: string) => {
    setHoveredImage(prevState => ({ ...prevState, [id]: hoverImg }));
    setHovered(prevState => ({ ...prevState, [id]: true }));
  };

  const handleMouseLeave = (id: string, mainImg: string) => {
    setHoveredImage(prevState => ({ ...prevState, [id]: mainImg }));
    setHovered(prevState => ({ ...prevState, [id]: false }));
  };

  return (
    <div className="NewArrivalContainer">
      <div className="TopHead">
        <div className="vr"></div>
        <div className="Title">
          <span>New arrivals</span>
        </div>
        <div className="vr"></div>
      </div>
      <div className="ViewAll">
        <span>View ALL</span>
      </div>

      <div className="Container">
        {newArrivalsData.length > 0 ? (
          newArrivalsData.map((item: NewArrival, index: number) => (
            <div className="ProductBox" key={index}>
              <div 
                className="ImgDiv"
                onMouseEnter={() => handleMouseEnter(item.id, item.hoverImg)}
                onMouseLeave={() => handleMouseLeave(item.id, item.mainImg)}
              >
                <img 
                  src={hoveredImage[item.id] || item.mainImg} 
                  alt={item.title}
                  className={hovered[item.id] ? 'hovered' : ''}
                />
                <div className="HoverButton">
                  <button>quick add</button>
                </div>
                <div className="SIdeIcons">
                  <div className="PWishList">
                    <span>Wish List</span>
                    <CiHeart />
                  </div>
                  <div className="pQuickAdd">
                    <span>Quick View</span>
                    <IoEyeOutline />
                  </div>
                </div>
              </div>
              <div className="DetailsDiv">
                <div className="Brand">
                  <span>{item.vendor}</span>
                </div>
                <div className="title">
                  <span>{item.title}</span>
                </div>
                <div className="price">
                  <span>{`from $${item.price}`}</span>
                </div>
                <div className="bottomImg">
                  {item.optionalImgs.map((mapIng) => (
                    <div className="HoverRoundImg" key={mapIng.id}>
                      <img src={mapIng.img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No new arrivals</h1>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
