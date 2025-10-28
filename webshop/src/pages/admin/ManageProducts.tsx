import { useEffect, useRef, useState } from "react";
// import productsJSON from "../../data/products.json";
import { Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal, {
  type ConfirmationModalType,
} from "../../components/ui/ConfirmationModal";
import ConfirmationModal2, {
  type ConfirmationModal2Type,
} from "../../components/ui/ConfirmationModal2";
import type { Product } from "../../models/Product";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

// let indexToBeDeleted;

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const idToBeDeleted = useRef<number>(-1);
  const confirmationModalRef = useRef<ConfirmationModalType>(null);
  const confirmationModalRef2 = useRef<ConfirmationModal2Type>(null);

  /*useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  */

  const { items, loading } = useFetch("/products");
  useEffect(() => {
    setProducts(items);
  }, [items]);

  function deleteProduct() {
    if (idToBeDeleted.current === -1) {
      return;
    }

    fetch(
      import.meta.env.VITE_BASE_URL + "/products/" + idToBeDeleted.current,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then((json) => {
        toast.success("Product succesfully added");
        setProducts(json);
        confirmationModalRef2.current?.handleClose();
      });
  }

  function openModal(id: number) {
    // confirmationModalRef.current.handleShow();
    confirmationModalRef2.current?.handleShow();
    idToBeDeleted.current = id;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Category</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.active ? "Actiivne" : "Mitteaktiivne"}</td>
              <td>{product.category?.name}</td>
              <td>
                {product.image ? (
                  <img className="logo" src={product.image} alt="" />
                ) : (
                  ""
                )}
              </td>
              <td>
                <button onClick={() => openModal(Number(product.id))}>
                  {" "}
                  x{" "}
                </button>
              </td>
              <td>
                <Link to={"/admin/muuda-toode/" + product.id}>
                  <button>Muuda</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal
        ref={confirmationModalRef}
        deleteItem={deleteProduct}
        subject="product"
      />

      <ConfirmationModal2
        ref={confirmationModalRef2}
        deleteItem={deleteProduct}
        subject="product2"
      />
      <Toaster />
    </div>
  );
}

export default ManageProducts;
