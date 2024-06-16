import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SingleProducts.css";
import { FaFire } from "react-icons/fa";

interface OptionalImage {
  img: string;
}

interface Product {
  optionalImgs: OptionalImage[];
  mainImg: string;
  title: string;
  availability: string;
  brand: string;
  categories: string;
  description: string;
  hoverImg: string;
  left: number;
  price: number;
  productType: string;
  sku: string;
  soldINHours: string;
  startRatings: string;
  vendor: string;
  Size: string[];
  id: string; // Assuming there is an id property for product ID
}

interface SingleProductsProps {
  onAddToCart: (productId: string, title: string, price: number, mainImg: string, size: string, quantity: number) => void;
}

const SingleProduct: React.FC<SingleProductsProps> = ({ onAddToCart }) => {
  const location = useLocation();
  const { product } = (location.state as { product: Product }) || {};
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [quantity, setQuantity] = useState<number>(1);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (quantity > 5) {
      setWarningMessage("Warning: Quantity exceeds 5.");
    } else {
      setWarningMessage("");
    }
  }, [quantity]);

  if (!product) {
    return <div>No product data available.</div>;
  }

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 5) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setWarningMessage("Warning: Quantity cannot exceed 5.");
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if (quantity <= 5) {
      setWarningMessage("");
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, product.title, product.price, product.mainImg, selectedSize, quantity);
  };

  return (
    <div className="SingleProduct">
      {isMobile ? (
        <>
          <div className="ProductMainImg">
            <img src={product.mainImg} alt="Product main" />
          </div>
          <div className="ProductChngImgs">
            {product.optionalImgs && product.optionalImgs.length > 0 ? (
              product.optionalImgs.map((imgObj, index) => (
                <img key={index} src={imgObj.img} alt={`Product optional ${index}`} />
              ))
            ) : (
              <p>No optional images available.</p>
            )}
          </div>
          <div className="ProductsDetails">
            <div className="ProductTitle">
              <h1> {product.title} </h1>
            </div>
            <div className="ProductSoldInHours">
              <FaFire /> <span> {product.soldINHours} </span>
            </div>
            <div className="ProductDescription">{product.description}</div>
            <div className="ProductVendor">
              <span>Vendor :</span> <span> {product.vendor} </span>
            </div>
            <div className="ProductSku">
              <span>SKU:</span>
              <span> {product.sku} </span>
            </div>
            <div className="ProductAvailiblty">
              <span>Availability : </span>
              <span> {product.availability} </span>
            </div>
            <div className="ProductType">
              <span>Product Type :</span>
              <span> {product.productType} </span>
            </div>
            <div className="ProductPrice">
              <span> $86.00 </span>
              <span> ${product.price} </span>
            </div>
            <div className="ProductSize">
              <div className="SizeTop">
                <span>Size : </span>
                <span>{selectedSize}</span>
              </div>
              <div className="SizeButtons">
                {product.Size && product.Size.length > 0 ? (
                  product.Size.map((size, index) => (
                    <button
                      key={index}
                      className={`size-button ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p>No sizes available.</p>
                )}
              </div>
            </div>
            <div className="QuantityDiv">
              <span>Quantity:</span>
              <div className="QuantityBox">
                <button onClick={handleDecreaseQuantity}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
              {warningMessage && <div className="warning">{warningMessage}</div>}
            </div>
            <div className="AddToCartButton">
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ProductChngImgs">
            {product.optionalImgs && product.optionalImgs.length > 0 ? (
              product.optionalImgs.map((imgObj, index) => (
                <img key={index} src={imgObj.img} alt={`Product optional ${index}`} />
              ))
            ) : (
              <p>No optional images available.</p>
            )}
          </div>
          <div className="ProductMainImg">
            <img src={product.mainImg} alt="Product main" />
          </div>
          <div className="ProductsDetails">
            <div className="ProductTitle">
              <h1> {product.title} </h1>
            </div>
            <div className="ProductSoldInHours">
              <FaFire /> <span> {product.soldINHours} </span>
            </div>
            <div className="ProductDescription">{product.description}</div>
            <div className="ProductVendor">
              <span>Vendor :</span> <span> {product.vendor} </span>
            </div>
            <div className="ProductSku">
              <span>SKU:</span>
              <span> {product.sku} </span>
            </div>
            <div className="ProductAvailiblty">
              <span>Availability : </span>
              <span> {product.availability} </span>
            </div>
            <div className="ProductType">
              <span>Product Type :</span>
              <span> {product.productType} </span>
            </div>
            <div className="ProductPrice">
              <span> $86.00 </span>
              <span> ${product.price} </span>
            </div>
            <div className="ProductSize">
              <div className="SizeTop">
                <span>Size : </span>
                <span>{selectedSize}</span>
              </div>
              <div className="SizeButtons">
                {product.Size && product.Size.length > 0 ? (
                  product.Size.map((size, index) => (
                    <button
                      key={index}
                      className={`size-button ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p>No sizes available.</p>
                )}
              </div>
            </div>
            <div className="QuantityDiv">
              <span>Quantity:</span>
              <div className="QuantityBox">
                <button onClick={handleDecreaseQuantity}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
              {warningMessage && <div className="warning">{warningMessage}</div>}
            </div>
            <div className="AddToCartButton">
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
