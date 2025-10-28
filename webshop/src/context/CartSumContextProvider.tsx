import { useState, type ReactNode } from "react";
import { CartSumContext } from "./CartSumContext";
import type { CartProduct } from "../models/CartProduct";
import { calculateCartSum } from "../util/Calculations";

export const CartSumContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartSum, setCartSum] = useState<number>(initialCartSum());

  function initialCartSum() {
    const products: CartProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    // let sum = 0;
    //  products.forEach((cp) => (sum += cp.product.price * cp.quantity));
    // return sum;
    return calculateCartSum(products);
  }

  function increaseCartSum(productPrice: number) {
    setCartSum((prev) => prev + productPrice);
  }

  function decreaseCartSum(productPrice: number) {
    setCartSum((prev) => prev - productPrice);
  }

  function empty() {
    setCartSum(0);
  }

  return (
    <CartSumContext.Provider
      value={{ cartSum, increaseCartSum, decreaseCartSum, empty }}
    >
      {children}
    </CartSumContext.Provider>
  );
};
