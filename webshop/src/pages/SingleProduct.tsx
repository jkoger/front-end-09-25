import { useParams } from "react-router-dom";

import productJSON from "../data/products.json";

function SingleProduct() {
  const { productName } = useParams();
  const product = productJSON.find((product) => product.name === productName);

  if (!product) {
    return <div>Toodet ei leitud</div>;
  }

  return (
    <div>
      <div>{product.name}</div>
      <div>{product.price} eur</div>
      <div>{product.category}</div>
      <div>{product.active && "Toode on mitteaktiivne"}</div>
    </div>
  );
}

export default SingleProduct;
