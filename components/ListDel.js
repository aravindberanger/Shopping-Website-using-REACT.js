import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase'; // Assuming you've properly set up your Firestore instance
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export default function ListDel() {
    const navigate = useNavigate();
    const [studentObjects, setStudentObjects] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsCollection = collection(db, 'delivery');
                const snapshot = await getDocs(studentsCollection);

                if (!snapshot.empty) {
                    let students = [];
                    snapshot.forEach(doc => {
                        students.push({ id: doc.id, ...doc.data() });
                    });
                    setStudentObjects(students);
                } else {
                    setStudentObjects([]);
                }
            } catch (error) {
                console.error('Error getting documents: ', error);
            }
        };

        fetchStudents();
    }, []);

    const onDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'delivery', id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const onEdit = (id) => {
        // Redirect or navigate to the edit page with the currentId
        navigate(`../delivery/${id}/edit`);
    };

    return (
        <>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home </Link>
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
                <h1>List Delivery</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address Line one</th>
                            <th>Address Line two</th>
                            <th>Pincode</th>
                            <th>Landmark</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentObjects.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.address1}</td>
                                <td>{student.address2}</td>
                                <td>{student.pincode}</td>
                                <td>{student.landmark}</td>
                                
                                <td className="case-record">
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => onEdit(student.id)}
                                    >
                                        Edit
                                    </button>
                               
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => onDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
