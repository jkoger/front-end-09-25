import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Button as BButton } from "react-bootstrap";

import { Toaster } from "react-hot-toast";
import type { Product } from "../models/Product";

import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import useAddToCart from "../hooks/useAddToCart";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  // const { increaseCartSum } = useContext(CartSumContext);
  // const dispatch = useAppDispatch();
  const addToCart = useAddToCart();

  /*
  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  */
  const { items, loading } = useFetch("/products");
  useEffect(() => {
    setProducts(items);
  }, [items]);

  function sortAZ() {
    products.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  function sortZA() {
    products.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  function sortPriceAsc() {
    products.sort((a, b) => a.price - b.price);
    setProducts(products.slice());
  }
  function sortPriceDesc() {
    products.sort((a, b) => b.price - a.price);
    setProducts(products.slice());
  }

  function filterUnder5() {
    const result = products.filter((product) => product.price < 3);
    setProducts(result);
  }

  function filterActive() {
    const result = products.filter((product) => product.active);
    setProducts(result);
  }
  /*
  function addToCart(clickedProduct: Product) {
    const cartLS: CartProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    const found = cartLS.find(
      (cartProduct) => cartProduct.product.id === clickedProduct.id,
    );

    if (found) {
      found.quantity++;
    } else {
      cartLS.push({ quantity: 1, product: clickedProduct });
    }

    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success("Product succefully added to cart");
    increaseCartSum(clickedProduct.price);
    dispatch(increment());
  }
    */

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Kokku on {products.length} toodet</div>
      <Button onClick={() => sortAZ()}>Soorteerti A-Z</Button>
      <Button onClick={() => sortZA()}>Soorteerti Z-A</Button>
      <Button onClick={() => sortPriceAsc()}>Soorteerti hind kasvas</Button>
      <Button onClick={() => sortPriceDesc()}>
        Soorteerti hind kahanevalt
      </Button>

      <br />
      <Button onClick={() => filterUnder5()}>Filtreeri odavamad kui 3</Button>
      <Button onClick={() => filterActive()}>Filtreeri aktiivsed</Button>

      {products.map((product) => (
        <div key={product.id}>
          {product.image && <img className="logo" src={product.image} alt="" />}
          <div>{product.name}</div>
          <div>{product.price} eur</div>
          <BButton onClick={() => addToCart(product)}>Lisa ostukorvi</BButton>
          <Link to={"/toode/" + product.id}>
            <button>Vt lahemalt</button>
          </Link>
        </div>
      ))}

      <Toaster />
    </div>
  );
}

export default HomePage;
