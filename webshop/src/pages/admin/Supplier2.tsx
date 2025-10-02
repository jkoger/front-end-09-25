import { useEffect, useState } from "react"

export interface Supplier2Product {
    id: number
    title: string
    slug: string
    price: number
    description: string
    category: Category
    images: string[]
    creationAt: string
    updatedAt: string
  }
  
  export interface Category {
    id: number
    name: string
    slug: string
    image: string
    creationAt: string
    updatedAt: string
  }


function Supplier2() {

    const [products, setProducts] = useState<Supplier2Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch ("https://api.escuelajs.co/api/v1/products")
        .then(res => res.json())
        .then(json => {
            setProducts(json);
            setLoading(false);
        });
        
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }


  return (
    <div>

        <div> Toodeid kokku: {products.length} tk</div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Cathegory</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product => 
            <tr key = {product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
                <td><img className ="logo" src= {product.images[0]} alt ="" /></td>

            </tr> )}
            </tbody>
        </table>
        
    </div>
  )
}

export default Supplier2