import { useNavigate, useParams } from "react-router-dom";
// import productJSON from "../data/products.json";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Checkbox from "../components/ui/Checkbox";
import Dropdown from "../components/ui/Dropdown";
import type { Product } from "../models/Product";
import type { Category } from "../models/Category";
import useFetch from "../hooks/useFetch";

function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    active: false,
    category: { name: "" },
  });

  /*

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);
  */
  const {
    items: categories,
    loading,
  }: { items: Category[]; loading: boolean } = useFetch("categories");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/products/" + productId)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  function updateField(value: any, key: string) {
    if (!product) {
      return;
    }
    if (key === "category") {
      setProduct({ ...product, category: { name: value } });
    } else {
      setProduct({ ...product, [key]: value });
    }
  }

  function editProduct() {
    if (!product) {
      return;
    }
    if (product.name === "") {
      alert("Tuhja nimega ei saa lisada");
      return;
    }

    fetch(import.meta.env.VITE_BASE_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => navigate("/admin/halda-tooteid"));
  }

  if (product.id === 0) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Toodet ei leitud</div>;
  }

  return (
    <div>
      <div>Ajutine valjakuvamine: {JSON.stringify(product)}</div>
      <br />
      <br />
      <br />
      <TextField
        label="Name"
        defaultValue={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <br />
      <br />
      <TextField
        label="Price"
        defaultValue={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
      <br />
      <br />
      <TextField
        label="Image"
        defaultValue={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <br />
      <br />
      <Checkbox
        handleChecked={updateField}
        label="Active"
        defaultChecked={product.active}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Dropdown
          handleSelect={updateField}
          options={categories.map((category) => category.name)}
          defaultValue={product.category?.name}
          header="category"
        ></Dropdown>
      )}
      <br />
      <br />

      <Button onClick={editProduct} variant="contained">
        Muuda
      </Button>
    </div>
  );
}

export default EditProduct;
