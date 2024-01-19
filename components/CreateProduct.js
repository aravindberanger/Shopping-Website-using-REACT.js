import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/api3/product/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/product');
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

        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Product Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Product made by: </label>
                            </th>
                            <td> 
                                <input type="text" name="made" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Department: </label>
                            </th>
                            <td>
                                <input type="text" name="dept" onChange={handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>
                                <label>Price: </label>
                            </th>
                            <td>
                                <input type="text" name="price" onChange={handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                        <td colSpan="2" align ="center">
                            <button class="save">
                            <span class="circle1"></span>
                            <span class="circle2"></span>
                            <span class="circle3"></span>
                            <span class="circe4"></span>
                            <span class="circle5"></span>
                            <span class="text">Save</span> 
                            </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </>
    )
}
