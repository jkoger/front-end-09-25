import { useState } from "react";
//import productsJSON from "../../data/products.json";

import toast, { Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import Dropdown from "../../components/ui/Dropdown";
import Checkbox from "../../components/ui/Checkbox";
import type { Product } from "../../models/Product";
import type { Category } from "../../models/Category";
import useFetch from "../../hooks/useFetch";

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    active: false,
    category: { name: "" },
  });

  const {
    items: categories,
    loading,
  }: { items: Category[]; loading: boolean } = useFetch("categories");

  /*const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);
  */

  function add() {
    /*
    if (!product.name) {
      toast.error("Cannot add without name");
      return;
    }

    if (!product.price || product.price <= 0) {
      toast.error("Price incorrect");
      return;
    }
      */

    //productsJSON.push(product);
    fetch(import.meta.env.VITE_BASE_URL + "/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.code) {
          toast.error(json.message);
        } else {
          toast.success("Product succesfully added");
        }
      });
  }

  function updateField(value: any, key: string) {
    if (key === "category") {
      setProduct({ ...product, category: { name: value } });
    } else {
      setProduct({ ...product, [key]: value });
    }
  }

  return (
    <div>
      <div>Ajutine väljakuvamine : {JSON.stringify(product)} </div>
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
        defaultChecked={false}
        label="Active"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Dropdown
          handleSelect={updateField}
          options={categories.map((category) => category.name)}
          header="category"
          defaultValue=""
        >
          {/* <input onChange={(e) => setProduct({...product, category: e.target.value})} type="text"/> <br />*/}
        </Dropdown>
      )}
      <button onClick={add}> Sisesta</button>
      <Toaster />
    </div>
  );
}

export default AddProduct;
