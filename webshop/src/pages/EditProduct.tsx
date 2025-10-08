import { useNavigate, useParams } from "react-router-dom";
import productJSON from "../data/products.json";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Checkbox from "../components/ui/Checkbox";
import Dropdown from "../components/ui/Dropdown";

function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(
    productJSON.find((product) => product.id === Number(productId)),
  );

  const categories = ["drink", "snack", "fruit", "dairy", "bakery"];
  const navigate = useNavigate();

  function updateField(value: any, key: string) {
    if (!product) {
      return;
    }
    setProduct({ ...product, [key]: value });
  }

  function editProduct() {
    if (!product) {
      return;
    }
    if (product.name === "") {
      alert("Tuhja nimega ei saa lisada");
      return;
    }
    const index = productJSON.findIndex((p) => p.id === product.id);
    productJSON[index] = product;
    navigate("/admin/halda-tooteid");
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
      <Dropdown
        handleSelect={updateField}
        options={categories}
        defaultValue={product.category}
        header="category"
      ></Dropdown>
      <br />
      <br />

      <Button onClick={editProduct} variant="contained">
        Muuda
      </Button>
    </div>
  );
}

export default EditProduct;
