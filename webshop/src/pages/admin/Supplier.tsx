import { useEffect, useState } from "react"

export interface Supplier1Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
  }
  
  export interface Rating {
    rate: number
    count: number
  }


function Supplier() {

    const [products, setProducts] = useState<Supplier1Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch ("https://fakestoreapi.com/products/")
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
                    <th>Rating rate</th>
                    <th>Rating count</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product => 
            <tr key = {product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td><img className ="logo" src= {product.image} alt ="" /></td>
                <td>{product.rating.rate}</td>
                <td>{product.rating.count}</td>

            </tr> )}
            </tbody>
        </table>
        
    </div>
  )
}

export default Supplier