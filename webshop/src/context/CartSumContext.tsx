import { createContext } from "react";

export const CartSumContext = createContext({
    cartSum : 0,
    increaseCartSum : (_productPrice: number) => {},
    decreaseCartSum: (_productPrice: number) => {},
    empty : () => {}
});
