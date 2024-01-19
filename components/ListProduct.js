import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListProduct() {
    const navigate = useNavigate();
    const [product, setProducts] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get('http://localhost/api3/product/').then(function (response) {
            console.log(response.data);
            setProducts(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/api3/product/${id}/delete`).then(function (response) {
            console.log(response.data);
            getProduct();
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" onClick={() => navigate("../user", { replace: true })}>
                                <Link className="nav-link">List Users</Link>
                            </li>
                            <li className="nav-item" onClick={() => navigate("../user/create", { replace: true })}>
                                <Link className="nav-link">Create User</Link>
                            </li>
                            <li className="nav-item" onClick={() => navigate("../product/create", { replace: true })}>
                                <Link className="nav-link">Create Product</Link>
                            </li>
                            <li className="nav-item" onClick={() => navigate("../product/", { replace: true })}>
                                <Link className="nav-link">List Product</Link>
                            </li>
                            <li className="nav-item" onClick={() => navigate("../delivery/create", { replace: true })}>
                                <Link className="nav-link">Create Delivery</Link>
                            </li>
                            <li className="nav-item" onClick={() => navigate("../delivery/", { replace: true })}>
                                <Link className="nav-link">List Delivery</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <h1>List Product</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Made By</th>
                            <th scope="col">Department</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, key) =>
                            <tr key={key}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.made}</td>
                                <td>{product.dept}</td>
                                <td>{product.price}</td>
                                <td>
                                <Link to={`${product.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button className="button" onClick={() => deleteUser(product.id)}>
                                <span class="button-content">Delete </span>
                                </button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
                </table>
            </div>
        </>
    );
}
