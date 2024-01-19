import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]); // State for sorted users
  const [sortAscending, setSortAscending] = useState(true); // State to toggle between ascending and descending
  const [filterTerm, setFilterTerm] = useState(''); // State for filtering

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get('http://localhost:8000/users/').then(function (response) {
      console.log(response.data);
      setUsers(response.data);
      setSortedUsers(response.data); // Initialize sortedUsers with the data
    });
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/users/${id}/`).then(function (response) {
      console.log(response.data);
      getUsers();
    });
  }

  const handleSort = (key) => {
    const sorted = [...sortedUsers]; // Create a copy to avoid modifying the original data
    sorted.sort((a, b) => {
      if (sortAscending) {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return b[key] > a[key] ? 1 : -1;
      }
    });

    // Toggle the sort direction
    setSortAscending(!sortAscending);

    // Update the sorted data in state
    setSortedUsers(sorted);
  }

  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    setFilterTerm(searchTerm);
  
    const filteredUsers = users.filter(user =>
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.toString().includes(searchTerm) // Convert mobile to string for comparison
    );
  
    setSortedUsers(filteredUsers);
  }

  const sortIcon = sortAscending ? '▲' : '▼';
  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/"> Home</Link>
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
        <h1>List Users</h1>
        <input
          type="text"
          placeholder="Search by Address, City, or Mobil"
          value={filterTerm}
          onChange={handleFilter}
        />
        <button onClick={() => handleSort('id')}>Sort by Id {sortIcon}</button>
        <button onClick={() => handleSort('address')}>Sort by Address {sortIcon}</button>
        <button onClick={() => handleSort('city')}>Sort by City {sortIcon}</button>
        <button onClick={() => handleSort('mobile')}>Sort by Mobile {sortIcon}</button>

        <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Address</th>
            <th>City</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.mobile}</td>
              <td>
                <Link to={`${user.id}/edit`} style={{ marginRight: "10px" }}>
                  Edit
                </Link>
                <button className="button" onClick={() => deleteUser(user.id)}>
                  <span className="button-content">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}
