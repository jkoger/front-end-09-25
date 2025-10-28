import { useEffect, useRef, useState } from "react";

import { Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import ConfirmationModal, {
  type ConfirmationModalType,
} from "../../components/ui/ConfirmationModal";
import ConfirmationModal2, {
  type ConfirmationModal2Type,
} from "../../components/ui/ConfirmationModal2";
import type { Category } from "../../models/Category";
import { TextField } from "@mui/material";
import useFetch from "../../hooks/useFetch";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const nameToBeDeleted = useRef<string>("");
  const confirmationModalRef = useRef<ConfirmationModalType>(null);
  const confirmationModalRef2 = useRef<ConfirmationModal2Type>(null);

  const [category, setCategory] = useState<Category>({
    name: "",
  });

  /*

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + "/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);
  */
  const { items, loading } = useFetch("/categories");
  useEffect(() => {
    setCategories(items);
  }, [items]);

  function add() {
    if (!category.name) {
      toast.error("Cannot add without name");
      return;
    }

    fetch(import.meta.env.VITE_BASE_URL + "/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        toast.success("Category succesfully added");
        setCategory({ name: "" });
      });
  }

  function deleteCategory() {
    if (nameToBeDeleted.current === "") {
      return;
    }

    fetch(
      import.meta.env.VITE_BASE_URL + "/categories/" + nameToBeDeleted.current,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.json())
      .then((json) => {
        toast.success("Category succefully deleted");
        setCategories(json);
        confirmationModalRef2.current?.handleClose();
      });
  }

  function openModal(name: string) {
    confirmationModalRef2.current?.handleShow();
    nameToBeDeleted.current = name;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TextField
        label="Name"
        value={category.name}
        onChange={(e) => setCategory({ ...category, name: e.target.value })}
        type="text"
      />
      <br />
      <br />
      <button onClick={add}> Sisesta</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => openModal(category.name)}> x </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal
        ref={confirmationModalRef}
        deleteItem={deleteCategory}
        subject="category"
      />

      <ConfirmationModal2
        ref={confirmationModalRef2}
        deleteItem={deleteCategory}
        subject="category2"
      />
      <Toaster />
    </div>
  );
}

export default ManageCategories;
