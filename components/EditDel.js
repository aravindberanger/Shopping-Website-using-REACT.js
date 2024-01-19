import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from '../firebase'; // Assuming you've properly set up your Firestore instance
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function EditDelivery() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [inputs, setInputs] = useState({
        name: '',
        address1: '',
        address2: '',
        pincode: '',
        landmark: '',
    });

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const deliveryDocRef = doc(db, 'delivery', id);
                const deliveryDoc = await getDoc(deliveryDocRef);

                if (deliveryDoc.exists()) {
                    const deliveryData = deliveryDoc.data();
                    setInputs(deliveryData);
                } else {
                    console.error('Document not found');
                }
            } catch (error) {
                console.error('Error fetching document: ', error);
            }
        };

        fetchDelivery();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const deliveryDocRef = doc(db, 'delivery', id);
            await updateDoc(deliveryDocRef, inputs);
            navigate('../delivery', { replace: true });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    return (
        <>
            <nav>
                <ul>
                    
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
                </ul>
            </nav>
            <div>
                <h1>Edit Delivery</h1>
                <form onSubmit={handleSubmit}>
                    <table cellSpacing="10">
                        <tbody>
                            <tr>
                                <th>
                                    <label>Customer Name: </label>
                                </th>
                                <td>
                                    <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Address Line One: </label>
                                </th>
                                <td>
                                    <input value={inputs.address1} type="text" name="address1" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Address Line Two: </label>
                                </th>
                                <td>
                                    <input value={inputs.address2} type="text" name="address2" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Pincode: </label>
                                </th>
                                <td>
                                    <input value={inputs.pincode} type="text" name="pincode" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>Landmark: </label>
                                </th>
                                <td>
                                    <input value={inputs.landmark} type="text" name="landmark" onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button className="button1">Save</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}
