import React, { useEffect, useState } from "react";
import "./NewArrivals.css";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

interface OptionalImg {
  textHover: string;
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
  const [hoverText, setHoverText] = useState<{ [key: string]: string }>({});

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
  };

  const handleMouseLeave = (id: string, mainImg: string) => {
    setHoveredImage(prevState => ({ ...prevState, [id]: mainImg }));
  };

  const handleHoverTextChange = (id: string, text: string) => {
    setHoverText(prevState => ({ ...prevState, [id]: text }));
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
                  <span>{item.title} {hoverText[item.id]}</span>
                </div>
                <div className="price">
                  <span>{`from $${item.price}`}</span>
                </div>
                {
                  item.optionalImgs &&  (
                    <div className="bottomImg">
                      {item.optionalImgs.map((mapIng) => (
                        <div 
                          className="HoverRoundImg" 
                          onClick={() => handleHoverTextChange(item.id, mapIng.textHover)} 
                          key={mapIng.id}
                        >
                          {mapIng.textHover && (<span>{mapIng.textHover}</span>)}
                          <img src={mapIng.img} alt="" />
                        </div>
                      ))}
                    </div>
                  ) 
                }
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
