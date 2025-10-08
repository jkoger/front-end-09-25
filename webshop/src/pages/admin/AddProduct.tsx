import { useState } from "react";
import productsJSON from "../../data/products.json";

import toast, { Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import Dropdown from "../../components/ui/Dropdown";
import Checkbox from "../../components/ui/Checkbox";
import type { Product } from "../../models/Product";

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    active: false,
    category: "",
  });
  const categories = ["drink", "snack", "fruit", "dairy", "bakery"];

  function add() {
    if (!product.name) {
      toast.error("Cannot add without name");
      return;
    }

    if (!product.price || product.price <= 0) {
      toast.error("Price incorrect");
      return;
    }

    productsJSON.push(product);
    toast.success("Product succesfully added");
  }

  function updateField(value: any, key: string) {
    setProduct({ ...product, [key]: value });
  }

  return (
    <div>
      <div>Ajutine väljakuvamine : {JSON.stringify(product)} </div>
      <label>ID</label> <br />
      <TextField
        label="ID"
        onChange={(e) => setProduct({ ...product, id: Number(e.target.value) })}
        type="number"
      />
      <br />
      <TextField
        label="Name"
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        type="text"
      />
      <br />
      <TextField
        label="Price"
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        type="number"
      />
      <br />
      <TextField
        label="Image"
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        type="text"
      />
      <br />
      <Checkbox
        handleChecked={updateField}
        defaultChecked={product.active}
        label="Active"
      />
      <Dropdown
        handleSelect={updateField}
        options={categories}
        header="category"
        defaultValue={product.category}
      >
        {/* <input onChange={(e) => setProduct({...product, category: e.target.value})} type="text"/> <br />*/}
      </Dropdown>
      <button onClick={add}> Sisesta</button>
      <Toaster />
    </div>
  );
}

export default AddProduct;
