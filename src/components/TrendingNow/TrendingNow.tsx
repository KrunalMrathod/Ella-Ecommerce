import { useEffect, useRef, useState } from "react";
import "./TrendingNow.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface OptionalImg {
  textHover: string;
  id: string;
  img: string;
}

interface TrendingNow {
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

const TrendingNow = () => {
  const [TrendingNowData, setTrendingNowData] = useState<TrendingNow[]>([]);
  const [hoveredImage, setHoveredImage] = useState<{ [key: string]: string }>({});
  const [hoverText, setHoverText] = useState<{ [key: string]: string }>({});

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedNewArrivalsString = localStorage.getItem("TrendingNow");
    let storedNewArrivals: TrendingNow[] = [];

    if (storedNewArrivalsString) {
      storedNewArrivals = JSON.parse(storedNewArrivalsString);
      setTrendingNowData(storedNewArrivals.concat(storedNewArrivals));
    }
  }, []);

  const handleMouseEnter = (id: string, hoverImg: string) => {
    setHoveredImage((prevState) => ({ ...prevState, [id]: hoverImg }));
  };

  const handleMouseLeave = (id: string, mainImg: string) => {
    setHoveredImage((prevState) => ({ ...prevState, [id]: mainImg }));
  };

  const handleHoverTextChange = (id: string, text: string) => {
    setHoverText((prevState) => ({ ...prevState, [id]: text }));
  };
  const handleScrollImages = (direction: string) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth;
      console.log(scrollAmount)
      console.log(container.clientWidth)

      if (direction === "right") {
        container.scrollLeft += scrollAmount;
      } else if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      }
    }
  };

  return (
    <div className="TrendingNow">
      <div className="TopHead">
        <div className="vr"></div>
        <div className="Title">
          <span>Trending Now</span>
        </div>
        <div className="vr"></div>
      </div>
      <div className="ViewAll">
        <button onClick={() => handleScrollImages("left")}>
          <FaAngleLeft />
        </button>
        <span>View ALL</span>
        <button onClick={() => handleScrollImages("right")}>
          <FaAngleRight />
        </button>
      </div>
      <div className="Container" ref={containerRef}>
        {TrendingNowData.length > 0 ? (
          TrendingNowData.map((item: TrendingNow, index: number) => (
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
                    {/* <CiHeart /> */}
                  </div>
                  <div className="pQuickAdd">
                    <span>Quick View</span>
                    {/* <IoEyeOutline /> */}
                  </div>
                </div>
              </div>
              <div className="DetailsDiv">
                <div className="Brand">
                  <span>{item.vendor}</span>
                </div>
                <div className="title">
                  <span>
                    {item.title} {hoverText[item.id]}
                  </span>
                </div>
                <div className="price">
                  <span>{`from $${item.price}`}</span>
                </div>
                {item.optionalImgs && (
                  <div className="bottomImg">
                    {item.optionalImgs.map((mapIng) => (
                      <div
                        className="HoverRoundImg"
                        onClick={() => handleHoverTextChange(item.id, mapIng.textHover)}
                        key={mapIng.id}
                      >
                        {mapIng.textHover && <span>{mapIng.textHover}</span>}
                        <img src={mapIng.img} alt="" />
                      </div>
                    ))}
                  </div>
                )}
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

export default TrendingNow;
