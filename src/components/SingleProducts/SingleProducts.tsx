import { useLocation } from "react-router-dom";

const SingleProductPage = () => {
  const location = useLocation();
  const { product } = location.state;
  console.log(product);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default SingleProductPage;
