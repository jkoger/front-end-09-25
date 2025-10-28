import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../models/Product";
import useAddToCart from "../hooks/useAddToCart";

// import productJSON from "../data/products.json";

function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    active: false,
    category: { name: "" },
  });

  const addToCart = useAddToCart();

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/products/" + productId)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  if (!product) {
    return <div>Toodet ei leitud</div>;
  }

  return (
    <div>
      <div>{product.name}</div>
      <div>{product.price} eur</div>
      <div>{product.category?.name}</div>
      <div>{product.active && "Toode on mitteaktiivne"}</div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default SingleProduct;
