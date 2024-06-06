import { useEffect, useState } from "react";
import "./FeaturedIn.css"


interface FeaturedIn {
    id: string;
    img: string;
    tegONImage : string;
    title: string;
    description : string;
  }

const FeaturedIn = () => {
    const [featuredInData, setFeaturedInData] = useState<FeaturedIn[]>([]);

  
    useEffect(() => {
      const storedNewArrivalsString = localStorage.getItem("FeaturedIn");
      let storedNewArrivals: FeaturedIn[] = [];
  
      if (storedNewArrivalsString) {
        storedNewArrivals = JSON.parse(storedNewArrivalsString);
        setFeaturedInData(storedNewArrivals);
      }
    }, []);
  return (
    <div className="FeaturedInMain">
      <div className="FeaturedInHead">
        <div className="vr"></div>
        <span>FEATURED ON ELLA</span>
        <div className="vr"></div>
      </div>
      <div className="FeaturedInContainer">
      {featuredInData.length > 0 ? (
          featuredInData.map((item: FeaturedIn, index: number) => (
            <div className="ProductBox" key={index}>
             <div className="MainImgBox">
                <img src={item.img} alt="DORUS" />
             </div>
             <div className="DetailsBox">
                <div className="Brand">
                    <span> {item.title} </span>
                </div>
                <div className="title">
                    <span> {item.description} </span>
                </div>
                <div className="Button">
                    <button>SHOP NOW</button>
                </div>
             </div>
             
            </div>
          ))
        ) : (
          <h1>No new Featured Data</h1>
        )}
      </div>
    </div>
  )
}

export default FeaturedIn
