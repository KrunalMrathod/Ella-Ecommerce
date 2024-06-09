// Breadcum.tsx
import React from "react";
import {  useParams } from "react-router-dom";

interface BreadcumProps {
  routeName: string;
  productName?: string;
}

const Breadcum: React.FC<BreadcumProps> = ({ routeName, productName }) => {
  // const location = useLocation();e
  const { productId } = useParams<{ productId: string }>();

  return (
    <div className="breadcum">
      <span>{routeName}</span>
      {productId && <span> / {productName}</span>}
    </div>
  );
};

export default Breadcum;
