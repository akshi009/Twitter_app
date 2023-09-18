import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]); 
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3005/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function createUser() {
    try {
      const response = await fetch("http://localhost:3005/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        await fetchUsers();
        setNewUser({
          name: "",
          email: "",
          image: "",
        });
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <nav className="bg-gray-950 p-3 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">Twitter</div>
          <div className="space-x-4">
            <button
              className="bg-blue-500 text-white py-2 mx-4 px-3 rounded-full hover:bg-blue-600 focus:outline-none"
              onClick={openSidebar}
            >
              Users
            </button>

            {isSidebarOpen && (
              <div className="sidebar bg-slate-900">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 mx-auto focus:outline-none"
                  onClick={closeSidebar}
                >
                  X
                </button>
              
                <div className="user-list ">
                 
                  <div>
                    <input
                     className="w-full mt-2  text-black bg-gray-600 rounded-md p-2 focus:outline-none"
            rows="1"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={handleInputChange}
                    />
                    <input
                     className="w-full mt-2  text-black bg-gray-600 rounded-md p-2 focus:outline-none"
            rows="1"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={handleInputChange}
                    />
                    <input
                     className="w-full mt-2  text-black bg-gray-600 rounded-md p-2 focus:outline-none"
            rows="1"
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      value={newUser.image}
                      onChange={handleInputChange}
                    />
                    <button  className="bg-green-500 mt-2 text-white py-2 px-4 rounded-full hover:bg-green-600 end-0 focus:outline-none" onClick={createUser}>Create User</button>
                  </div>
                  <ul>
                    {users.map((user) => (
                      <li key={user.id}>
                        <div className="post-card mt-2 bg-gray-700 text-white">
                          <div className="user-info">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="user-avatar"
                            />
                            <div className="user-details">
                              <p className="user-name ">{user.id}</p>
                              <p className="user-name ">{user.name}</p>
                              <p className="user-email ">@{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
