
import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure to import your Firebase configuration

import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        address1: '',
        address2: '',
        pincode: '',
        landmark: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Add the product to the 'products' collection in Firebase
            const docRef = await addDoc(collection(db, 'delivery'), inputs);
            console.log('Document written with ID: ', docRef.id);
            navigate('/delivery');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

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
                <h1>Create Delivery</h1>
                <form onSubmit={handleSubmit}>
                    <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Customer Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Address Line one: </label>
                            </th>
                            <td> 
                                <input type="text" name="address1" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Address Line two: </label>
                            </th>
                            <td>
                                <input type="text" name="address2" onChange={handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>
                                <label>Pincode: </label>
                            </th>
                            <td>
                                <input type="text" name="pincode" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Landmark: </label>
                            </th>
                            <td>
                                <input type="text" name="landmark" onChange={handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan="2" align="center">
                                <button className="save">
                                    {/* Your button content */}
                                    <span className="circle1"></span>
                                    <span className="circle2"></span>
                                    <span className="circle3"></span>
                                    <span className="circe4"></span>
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