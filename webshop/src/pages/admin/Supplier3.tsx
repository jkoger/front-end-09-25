import { useEffect, useState } from "react"


export interface Root {
    error: string
    total: string
    page: string
    books: Book[]
  }
  
  export interface Book {
    title: string
    subtitle: string
    isbn13: string
    price: string
    image: string
    url: string
  }

function Supplier3() {

    const [response, setResponse] = useState<Root>({error: "", total: "", page: "", books: []});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchedValue, setSearchedValue] = useState("react");

    useEffect(() => {
        fetch (`https://api.itbook.store/1.0/search/${searchedValue}?page=` + page)
        .then(res =>  res.json())
        .then(json => {
            setResponse(json);
            setLoading(false);
        });
        
    }, [searchedValue, page]);

    if (loading) {
        return <div>Loading...</div>
    }


  return (
    <div>

        <div> Toodeid kokku: {response.total} tk</div>
        <input
            defaultValue= {"react"}
            onChange={(e) => setSearchedValue(prev => e.target.value.length > 0 ? e.target.value : prev)}
            type="text"
/>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Buy product</th>
                </tr>
            </thead>
            <tbody>
            {response.books.map(product => 
            <tr key = {product.isbn13}>
                <td>{product.isbn13}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.subtitle}</td>
                <td><img className ="logo" src= {product.image} alt ="" /></td>
                <td>
                 <a href={product.url} target = "_blank"> Buy</a>
                </td>

            </tr> )}
            </tbody>
        </table>
        <button  disabled = {page === 1} onClick ={() => setPage (prev => prev - 1)}>Prev</button>
        <span>{page}</span>
        <button disabled = {page === Math.ceil(Number(response.total)/10)} onClick ={() => setPage (prev => prev + 1)}>Next</button>
        
    </div>
  )
}

export default Supplier3