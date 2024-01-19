import { useState } from "react";
import axios from "axios";
import {Link ,  useNavigate } from "react-router-dom";

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
        axios.post('http://localhost:8000/users', inputs).then(function(response){
            console.log(response.data);
            navigate('/user');
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
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Address: </label>
                            </th>
                            <td>
                                <input type="text" name="address" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>City: </label>
                            </th>
                            <td> 
                                <input type="text" name="city" onChange={handleChange} />
                            </td>
                        </tr>
                       
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                       

            <tr>
              <td colSpan="2" align ="center">
                <button className="save">
                  <span className="circle1"></span>
                  <span className="circle2"></span>
                  <span className="circle3"></span>
                  <span className="circe4"></span> {/* Typo in "circle4" */}
                  <span className="circle5"></span>
                  <span className="text">Save</span>
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
