import { useLocation } from "react-router-dom";
import "./SingleProducts.css";

const SingleProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div>No product data available.</div>;
  }

  return (
    <div className="SingleProduct">
      <div className="ProductImage">
        <img src={product.mainImg} alt={product.title} />
      </div>
      <div className="ProductDetails">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <span>${product.price}</span>
        {/* Add other product details as needed */}
      </div>
    </div>
  );
};

export default SingleProduct;
