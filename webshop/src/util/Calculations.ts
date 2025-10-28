import type { CartProduct } from "../models/CartProduct";

export function calculateCartSum(products: CartProduct[]) {
  let sum = 0;
  products.forEach((cp) => (sum += cp.product.price * cp.quantity));
  return sum;
}
