import { useEffect, useRef, useState } from "react";
import "./AllProducts.css";
import { FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";
import { HiMiniBars2, HiMiniBars4 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

interface OptionalImg {
  textHover: string;
  id: string;
  img: string;
}

interface allProdcut {
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


const AllProducts = () => {
  const [categories, setCategories] = useState<boolean>(true);
  const [price, setPrice] = useState<boolean>(true);
  const [types, setTypes] = useState<boolean>(true);
  const [brand, setBrand] = useState<boolean>(true);
  const [availability, setAvailability] = useState<boolean>(true);
  const [color, setColor] = useState<boolean>(true);
  const [size, setSize] = useState<boolean>(true);
  const [allProduct, setAllProduct] = useState<allProdcut[]>([]);
  const [rowView, setRowView] = useState<boolean>(false);
  const [twoColumnView, setTwoColumnView] = useState<boolean>(false);
  const [threeColumnView, setThreeColumnView] = useState<boolean>(false);
  const [fourColumnView, setFourColumnView] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const prevScrollY = useRef<number>(0);

  useEffect(() => {
    const storedNewArrivalsString = localStorage.getItem("AllProducts");
    let storedNewArrivals: allProdcut[] = [];

    if (storedNewArrivalsString) {
      storedNewArrivals = JSON.parse(storedNewArrivalsString);
      setAllProduct(storedNewArrivals);
    }

    const handleResize = () => {
      if (window.innerWidth < 1026) {
        setMobileFilter(true);
      } else {
        setMobileFilter(false);
      }
    };
    handleResize();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > initialPosition && !isSticky) {
        setIsSticky(true);
      } else if (currentScrollY <= initialPosition && isSticky) {
        setIsSticky(false);
      }

      prevScrollY.current = currentScrollY;
    };
    


    const containerElement = document.querySelector(".ViewAsButtons");
    if (containerElement) {
      setInitialPosition(containerElement.getBoundingClientRect().top + window.scrollY);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky,initialPosition]);

  const toggleState = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState((prevState) => !prevState);
  };

  const handleViewChange = (view: string) => {
    setRowView(view === "row");
    setTwoColumnView(view === "twoColumn");
    setThreeColumnView(view === "threeColumn");
    setFourColumnView(view === "fourColumn");
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter); 
  };

  return (
    <div className="AllProducts">
      {showFilter && (
        <div className="SideFilterMobiel">
          <div className="Filters">
            <div className="AllCategories">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setCategories)}
              >
                <span>CATEGORIES</span>{" "}
                {categories ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${categories ? "show" : ""}`}>
                <p>Cosmopolis</p>
                <p>Suito</p>
                <p>Milancelos</p>
                <p>Blazero</p>
                <p>Glamos</p>
                <p>Metropolis</p>
                <p>Valkyrio</p>
                <p>Scarvero</p>
                <p>Congue</p>
              </div>
            </div>
            <div className="AllPrice">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setPrice)}
              >
                <span>PRICE</span> {price ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${price ? "show" : ""}`}>
                <div className="PriceContainer">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="styled-slider"
                  />
                  <div className="PriceBoxes">
                    <div className="PriceBox">
                      {" "}
                      <span> $ </span> <span> 0 </span>{" "}
                    </div>
                    <span>to</span>
                    <div className="PriceBox">
                      {" "}
                      <span> $ </span> <span> 500 </span>{" "}
                    </div>
                  </div>
                  <button>apply</button>
                </div>
              </div>
            </div>
            <div className="AllType">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setTypes)}
              >
                <span>PRODUCT TYPES</span>{" "}
                {types ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${types ? "show" : ""}`}>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    Cosmopolis(8)
                  </label>
                </div>
              </div>
            </div>
            <div className="AllBrands">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setBrand)}
              >
                <span>BRAND</span> {brand ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${brand ? "show" : ""}`}>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    anna(2){" "}
                  </label>
                </div>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    donatello(2){" "}
                  </label>
                </div>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    french connection(1){" "}
                  </label>
                </div>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    sodling(1){" "}
                  </label>
                </div>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    tomorrow(2){" "}
                  </label>
                </div>
              </div>
            </div>
            <div className="Avaiability">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setAvailability)}
              >
                <span>AVAILABILITY</span>{" "}
                {availability ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${availability ? "show" : ""}`}>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    IN sTOCK(8){" "}
                  </label>
                </div>
                <div className="TypesDIV">
                  <input
                    type="checkbox"
                    id="check"
                    className="styled-checkbox"
                  />
                  <label htmlFor="check" className="styled-label">
                    {" "}
                    OUT OF STOCK(7){" "}
                  </label>
                </div>
              </div>
            </div>
            <div className="Color">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setColor)}
              >
                <span>COLOR</span> {color ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${color ? "show" : ""}`}>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
                <div className="ColorCircle"></div>
              </div>
            </div>
            <div className="Size">
              <div
                className="CategoriesDiv"
                onClick={() => toggleState(setSize)}
              >
                <span>SIZE</span> {size ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`CategoriesList ${size ? "show" : ""}`}>
                <div className="SizeContainer">
                  <span>S</span>
                </div>
                <div className="SizeContainer">
                  <span>M</span>
                </div>
                <div className="SizeContainer">
                  <span>L</span>
                </div>
                <div className="SizeContainer">
                  <span>XL</span>
                </div>
                <div className="SizeContainer">
                  <span>2X</span>
                </div>
                <div className="SizeContainer">
                  <span>3X</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cancelButton" onClick={toggleFilter}>
            X
          </div>
        </div>
      )}
      <div className="Filters">
        <div className="AllCategories">
          <div
            className="CategoriesDiv"
            onClick={() => toggleState(setCategories)}
          >
            <span>CATEGORIES</span>{" "}
            {categories ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${categories ? "show" : ""}`}>
            <p>Cosmopolis</p>
            <p>Suito</p>
            <p>Milancelos</p>
            <p>Blazero</p>
            <p>Glamos</p>
            <p>Metropolis</p>
            <p>Valkyrio</p>
            <p>Scarvero</p>
            <p>Congue</p>
          </div>
        </div>
        <div className="AllPrice">
          <div className="CategoriesDiv" onClick={() => toggleState(setPrice)}>
            <span>PRICE</span> {price ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${price ? "show" : ""}`}>
            <div className="PriceContainer">
              <input type="range" min="0" max="100" className="styled-slider" />
              <div className="PriceBoxes">
                <div className="PriceBox">
                  {" "}
                  <span> $ </span> <span> 0 </span>{" "}
                </div>
                <span>to</span>
                <div className="PriceBox">
                  {" "}
                  <span> $ </span> <span> 500 </span>{" "}
                </div>
              </div>
              <button>apply</button>
            </div>
          </div>
        </div>
        <div className="AllType">
          <div className="CategoriesDiv" onClick={() => toggleState(setTypes)}>
            <span>PRODUCT TYPES</span> {types ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${types ? "show" : ""}`}>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                Cosmopolis(8)
              </label>
            </div>
          </div>
        </div>
        <div className="AllBrands">
          <div className="CategoriesDiv" onClick={() => toggleState(setBrand)}>
            <span>BRAND</span> {brand ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${brand ? "show" : ""}`}>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                anna(2){" "}
              </label>
            </div>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                donatello(2){" "}
              </label>
            </div>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                french connection(1){" "}
              </label>
            </div>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                sodling(1){" "}
              </label>
            </div>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                tomorrow(2){" "}
              </label>
            </div>
          </div>
        </div>
        <div className="Avaiability">
          <div
            className="CategoriesDiv"
            onClick={() => toggleState(setAvailability)}
          >
            <span>AVAILABILITY</span>{" "}
            {availability ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${availability ? "show" : ""}`}>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                IN sTOCK(8){" "}
              </label>
            </div>
            <div className="TypesDIV">
              <input type="checkbox" id="check" className="styled-checkbox" />
              <label htmlFor="check" className="styled-label">
                {" "}
                OUT OF STOCK(7){" "}
              </label>
            </div>
          </div>
        </div>
        <div className="Color">
          <div className="CategoriesDiv" onClick={() => toggleState(setColor)}>
            <span>COLOR</span> {color ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${color ? "show" : ""}`}>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
            <div className="ColorCircle"></div>
          </div>
        </div>
        <div className="Size">
          <div className="CategoriesDiv" onClick={() => toggleState(setSize)}>
            <span>SIZE</span> {size ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className={`CategoriesList ${size ? "show" : ""}`}>
            <div className="SizeContainer">
              <span>S</span>
            </div>
            <div className="SizeContainer">
              <span>M</span>
            </div>
            <div className="SizeContainer">
              <span>L</span>
            </div>
            <div className="SizeContainer">
              <span>XL</span>
            </div>
            <div className="SizeContainer">
              <span>2X</span>
            </div>
            <div className="SizeContainer">
              <span>3X</span>
            </div>
          </div>
        </div>
      </div>

      <div className="AllProductsMain">
        <div className="ProductBannerImg">
          <div className="ProductImgBanner">
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/collections/image-collection-31.jpg?v=1566294680&width=1100"
              alt=""
            />
          </div>
          <div className="ProdcutImgDetails">
            <div className="PD-title">Cosmopolis</div>
            <div className="PD-description">
              Nullam aliquet vestibulum augue non varius. Cras cosmo congue an
              melitos. Duis tristique del ante le maliquam praesent murna de
              tellus laoreet cosmopolis. Quisque hendrerit nibh an purus
            </div>
          </div>
        </div>
        <div className="AllProductsContainerMain">
          <div className={`ViewAsButtons ${isSticky ? "sticky" : ""}`}>
            {mobileFilter ? (
              <>
                <div className="filterIconsMobile" onClick={toggleFilter}>
                  <CiFilter />
                  <span>Filter</span>
                </div>

                <div className="sortFilterMobile">
                  <span> Sort </span>
                  <IoIosArrowDown />
                </div>
              </>
            ) : (
              <>
                <span>VIEW AS</span>
                <div
                  className="ViewButton"
                  onClick={() => handleViewChange("row")}
                >
                  <FaBars />
                </div>
                <div
                  className="ViewButton"
                  onClick={() => handleViewChange("twoColumn")}
                >
                  <HiMiniBars2 />
                </div>
                <div
                  className="ViewButton"
                  onClick={() => handleViewChange("threeColumn")}
                >
                  <FaBars />
                </div>
                <div
                  className="ViewButton"
                  onClick={() => handleViewChange("fourColumn")}
                >
                  <HiMiniBars4 />
                </div>
              </>
            )}
          </div>
          <div
            className={`AllProdcutsmain ${rowView ? "rowView" : ""} ${
              twoColumnView ? "twoColumnView" : ""
            } ${threeColumnView ? "threeColumnView" : ""} ${
              fourColumnView ? "fourColumnView" : ""
            }`}
          >
            {allProduct.map((product) => (
              <div key={product.id} className="ProductItem">
                <Link
                  to={`/allProducts/singleProduct/${product.id}`}
                  state={{ product }}
                >
                  {rowView ? (
                    <>
                      <div className="imgDiv">
                        <img src={product.mainImg} alt={product.title} />
                      </div>
                      <div className="detailsDiv">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <span>${product.price}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={product.mainImg} alt={product.title} />
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <span>${product.price}</span>
                    </>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
