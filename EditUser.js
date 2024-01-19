import { useState, useEffect } from "react";
import axios from "axios";
import {Link ,  useNavigate, useParams } from "react-router-dom";
export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();
    

    useEffect(() => {
        getUser();
    }, []);

    
function getUser() {
    axios.get(`http://localhost:8000/users/${id}`).then(function(response) {
        console.log(response.data);
        if (response.data.length === 1) {
            // Assuming your response contains an array with a single user object
            const user = response.data[0];
            setInputs({
                address: user.address,
                city: user.city,
                mobile: user.mobile,
                // Add other fields as needed
            });
        } else {
            // Handle the case where the user with the specified ID is not found
            console.error(`User with ID ${id} not found.`);
        }
    });
}

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8000/users/${id}`, inputs).then(function(response){
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
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Address: </label>
                            </th>
                            <td>
                            <input value={inputs.address} type="text" name="address" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>City: </label>
                            </th>
                            <td> 
                                <input value={inputs.city} type="text" name="city" onChange={handleChange} />
                            </td>
                        </tr>
                        

                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input value={inputs.mobile} type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
      </>
    )
}
