import { useState } from "react";
import { CartSumContext } from "./CartSumContext";


export const CartSumContextProvider = ({children}) => {

    const [ cartSum, setCartSum  ] = useState (calculateCartSum());

    function calculateCartSum(){

        const products = JSON.parse(localStorage.getItem("cart") || "[]");
        let sum = 0;
        products.forEach(cp => sum += cp.product.price* cp.quantity);
        return sum;
    }

    function increaseCartSum(productPrice){
        setCartSum(prev => prev + productPrice);
    }

    function decreaseCartSum(productPrice){
        setCartSum(prev => prev - productPrice);
    }

    function empty(){
        setCartSum(0);
    }


    return (
        <CartSumContext.Provider value = {{cartSum, increaseCartSum, decreaseCartSum, empty}}>
        {children}
        </CartSumContext.Provider>
    )
}