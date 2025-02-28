import axios from "axios";
import { useEffect, useState } from "react"


export function FakeStore()
{

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{id:0, title:'', price:0, description:'', image:'', rating:{rate:0, count:0}}]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState();
    const [searchString, setSearchString] = useState('');

    function GetCartCount(){
        setCartCount(cartItems.length);
    }


    function LoadCategories(){
        axios.get(`https://fakestoreapi.com/products/categories`)
        .then(response=>{
            response.data.unshift('all');
            setCategories(response.data);
        })
    }

    function LoadProducts(url){
        axios.get(url)
        .then(response=>{
            setProducts(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        LoadProducts('https://fakestoreapi.com/products');
        GetCartCount();
    },[])

    function handleCategoryChange(e){
        if(e.target.value==="all") {
            LoadProducts('https://fakestoreapi.com/products');
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }

    function handleAddToCartClick(id){
         axios.get(`https://fakestoreapi.com/products/${id}`)
         .then(response=>{
              cartItems.push(response.data);
              alert(`${response.data.title}\nAdded to Cart`);
              GetCartCount();
         })
    }
    function handleSearchChange(e){
        setSearchString(e.target.value.toLowerCase());
    }
    function handleSearchClick(){
        LoadProducts(`https://fakestoreapi.com/products/category/${searchString}`);
    }

    function handleRatingChange(e){
        axios.get('https://fakestoreapi.com/products')
        .then(response=>{
            var filteredProducts = response.data.filter(product=> product.rating.rate>e.target.value);
            console.log(filteredProducts);
        })
        
    }

    return(
        <div className="container-fluid">
            <header className="d-flex bg-dark text-light fs-6 justify-content-between p-2 border mt-2">
                <div>
                    <span className="fs-4">Fakestore</span>
                </div>
                <div>
                    <div className="input-group">
                        <input onChange={handleSearchChange} type="text" placeholder="Search by category" className="form-control"/>
                        <button onClick={handleSearchClick} className="btn btn-warning bi bi-search"></button>
                    </div>
                </div>
                <nav>
                    <span> Electronics </span>
                    <span className="mx-2"> Men's Clothing </span>
                    <span> Women Fashon </span>
                    <span className="ms-2"> Jewelery </span>
                </nav>
                <div>
                    <button className="btn btn-light"><span className="bi bi-person"></span></button>
                    <button className="btn btn-light mx-2"><span className="bi bi-heart"></span></button>
                    <button data-bs-toggle="modal" data-bs-target="#cart" className="btn btn-light bi bi-cart position-relative"><span className="badge bg-danger rounded rounded-circle position-absolute">{cartCount}</span></button>
                    <div className="modal fade" id="cart">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="text-primary">Your Cart Items</h3>
                                    <button className="btn btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Preview</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map(item=> 
                                                    <tr key={item.id}>
                                                        <td>{item.title}</td>
                                                        <td><img src={item.image} width="50" height="50" /></td>
                                                        <td>{item.price}</td>
                                                        <td> <button className="bi bi-trash btn btn-danger"></button> </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="3">Total Amount</th>
                                                <th> &nbsp; </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="mt-3 row">
                <nav className="col-2">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Select Category</label>
                        <div>
                            <select onChange={handleCategoryChange} className="form-select">
                                {
                                    categories.map(category=><option value={category} key={category}>{category.toUpperCase()}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="my-3">
                        <label>Rating</label>
                        <div>
                            <div>
                            <input onChange={handleRatingChange} type="checkbox" value={4} /> <span>4 <span className="bi bi-star-fill"></span> above </span>
                            </div>
                            <div>
                            <input onChange={handleRatingChange} type="checkbox" value={3} /> <span>3 <span className="bi bi-star-fill"></span> above </span>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" style={{height:'500px'}}>
                    {
                        products.map(product=>

                            <div key={product.id} className="card p-2 m-2" style={{width:'200px'}}>
                                <img className="card-img-top" height="120" src={product.image} />
                                <div className="card-header" style={{height:'100px'}}>
                                    {product.title}
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{product.price}</dd>
                                        <dt>Rating</dt>
                                        <dd> {product.rating.rate} <span className="bi bi-star-fill text-success"></span> </dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button onClick={()=> handleAddToCartClick(product.id)} className="btn btn-warning w-100"> <span className="bi bi-cart4"> Add to Cart </span> </button>
                                </div>
                            </div>

                        )
                    }
                </main>
            </section>
        </div>
    )
}