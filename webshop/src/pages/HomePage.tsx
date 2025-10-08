import { useContext, useState } from "react";
import productsJSON from "../data/products.json";
import { Button } from "@mui/material";
import { Button as BButton } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";
import { CartSumContext } from "../context/CartSumContext";
import { increment } from "../store/counterSlice";
//import { useDispatch } from "react-redux";
import type { Product } from "../models/Product";
import type { CartProduct } from "../models/CartProduct";
import { useAppDispatch } from "../store/store";
import { Link } from "react-router-dom";

function HomePage() {
  const { increaseCartSum } = useContext(CartSumContext);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState(productsJSON);

  function sortAZ() {
    productsJSON.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(productsJSON.slice());
  }

  function sortZA() {
    productsJSON.sort((a, b) => b.name.localeCompare(a.name));
    setProducts(productsJSON.slice());
  }

  function sortPriceAsc() {
    productsJSON.sort((a, b) => a.price - b.price);
    setProducts(productsJSON.slice());
  }
  function sortPriceDesc() {
    productsJSON.sort((a, b) => b.price - a.price);
    setProducts(productsJSON.slice());
  }

  function filterUnder5() {
    const result = productsJSON.filter((product) => product.price < 3);
    setProducts(result);
  }

  function filterActive() {
    const result = productsJSON.filter((product) => product.active);
    setProducts(result);
  }

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
          <div>{product.name}</div>
          <div>{product.price} eur</div>
          <BButton onClick={() => addToCart(product)}>Lisa ostukorvi</BButton>
          <Link to={"/toode/" + product.name}>
            <button>Vt lahemalt</button>
          </Link>
        </div>
      ))}

      <Toaster />
    </div>
  );
}

export default HomePage;
