import { useEffect, useState } from "react";
import { auth, database } from "../Firebase/index";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Dashboard.css"; // Import CSS

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      // Reference to the "users" node in Firebase
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersList = Object.values(snapshot.val()); // Convert object to array
        setUsersData(usersList);
      }
    };

    fetchAllUsers();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>All Users</li>
          <li>Settings</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>All Registered Users</h1>
        {usersData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Country</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found...</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
