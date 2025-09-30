import { Fragment, useContext, useState } from "react"
import ParcelMachines from "../components/ParcelMachines";
import Payment from "../components/Payment";
import Checkbox from "../components/ui/Checkbox";
import { CartSumContext } from "../context/CartSumContext";
import { useDispatch } from "react-redux";
import { decrement, decrementByAmount, increment, zero } from "../store/counterSlice";

function Cart() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { empty, decreaseCartSum, increaseCartSum } = useContext(CartSumContext);
  const dispatch = useDispatch();

  function emptyCart() {
    empty();
    dispatch(zero());
    setProducts([]);
    localStorage.setItem("cart", "[]");
  }

  function decreaseQuantity(index) {
    decreaseCartSum(products[index].product.price);
    dispatch(decrement());

    products[index].quantity--;
    if (products[index].quantity === 0) {
      deleteProduct(index);
      return;
    }

    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }

  function increaseQuantity(index) {
    increaseCartSum(products[index].product.price);
    dispatch(increment());

    products[index].quantity++;

    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }
  
  function deleteProduct(index) {
    // decreaseCartSum(products[index].product.price);
    // dispatch(decrement());
    const deletedProduct = products[index];
    decreaseCartSum(deletedProduct.product.price * deletedProduct.quantity);
    dispatch(decrementByAmount(deletedProduct.quantity));
    
    products.splice(index,1);

    setProducts(products.slice());
    localStorage.setItem("cart", JSON.stringify(products));
  }

  function calculateCartSum() {
    let sum = 0;
    products.forEach(cp => sum += cp.product.price * cp.quantity);
    return sum;
  }

  return (
    <div>
      {products.length === 0 ?
        <div>Ostukorv on tühi</div>  :
        <>
          <div>Ostukorvis on {products.length} erinevat toodet</div>
          <button onClick={() => emptyCart()}>Tühjenda</button>
        </>
      }   

      {products.map((cp, index) => 
        <div key={cp.product.id}>
          <div>{cp.product.name}</div>
          <div>{cp.product.price.toFixed(2)} €</div>
          <button onClick={() => decreaseQuantity(index)}>-</button>
          <div>{cp.quantity} pcs</div>
          <button onClick={() => increaseQuantity(index)}>+</button>
          <div>{(cp.product.price * cp.quantity).toFixed(2)} €</div>
          <button onClick={() => deleteProduct(index)}>x</button>
        </div>
      )}

      {products.length > 0 &&
      <Fragment>
        <br />
        <div>Ostukorvi kogusumma on {calculateCartSum().toFixed(2)} €</div>

        <br /><br />
        <ParcelMachines />
        <br /><br />
        <Checkbox handleChecked={setAgreedToTerms} label="Agreed to terms" />
        <Payment isDisabled={!agreedToTerms} />
      </Fragment>}
    </div>
  )
}

export default Cart