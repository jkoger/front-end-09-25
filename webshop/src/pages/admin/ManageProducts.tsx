import { useRef, useState } from "react"
import productsJSON from "../../data/products.json"
import { Table } from "react-bootstrap"
import toast, {Toaster} from "react-hot-toast";
import ConfirmationModal, { type ConfirmationModalType} from "../../components/ui/ConfirmationModal";
import ConfirmationModal2, {type ConfirmationModal2Type} from "../../components/ui/ConfirmationModal2";
import type { Product } from "../../models/Product";

// let indexToBeDeleted;

function ManageProducts() {
    const [products, setProducts] = useState<Product[]>(productsJSON);
    const indexToBeDeleted = useRef<number>(-1);
    const confirmationModalRef = useRef<ConfirmationModalType>(null);
    const confirmationModalRef2 = useRef<ConfirmationModal2Type>(null);

    function deleteProduct() {
        if (indexToBeDeleted.current === -1){
            return
        }
        products.splice(indexToBeDeleted.current, 1);
        setProducts(products.slice());
        toast.success("Product successfuly deleted");
       // confirmationModalRef.current.handleClose();
       confirmationModalRef2.current?.handleClose();

    }

    function openModal(index : number){
       // confirmationModalRef.current.handleShow();
       confirmationModalRef2.current?.handleShow();
        indexToBeDeleted.current = index;
        console.log(confirmationModalRef2.current);
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
                </tr>
            </thead>
            <tbody>
            {products.map((product, index) => 
            <tr key = {product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.active ? "Actiivne": "Mitteaktiivne"}</td>
                <td>{product.category}</td>
                <td><img className ="logo" src= {product.image} alt ="" /></td>
                <td><button onClick = {() => openModal(index)}> x </button></td>

            </tr> )}
            </tbody>
        </Table>

        <ConfirmationModal  
        ref={confirmationModalRef} 
        deleteItem = {deleteProduct}
        subject = "product" />

        <ConfirmationModal2 
        ref = {confirmationModalRef2}
        deleteItem = {deleteProduct}
         subject = "product2"/>
        <Toaster />
    </div>
  )
}

export default ManageProducts