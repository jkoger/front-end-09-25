import toast from "react-hot-toast";
import type { CartProduct } from "../models/CartProduct";
import type { Product } from "../models/Product";
import { useContext } from "react";
import { CartSumContext } from "../context/CartSumContext";
import { useAppDispatch } from "../store/store";
import { increment } from "../store/counterSlice";

function useAddToCart() {
  const { increaseCartSum } = useContext(CartSumContext);
  const dispatch = useAppDispatch();

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
  return addToCart;
}

export default useAddToCart;
