import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/config';

const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch(API_URL + "/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function createUser() {
    try {
      const response = await fetch(API_URL + "/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setNewUser({
          name: '',
          email: '',
          image: '',
        });
      
        
        setUsers([createdUser, ...users]);
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <nav className="bg-zinc-900 p-3 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">Twitter</div>
          <div className="space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded-full hover:bg-blue-600 focus:outline-none"
              onClick={openSidebar}
            >
              Users
            </button>

            {isSidebarOpen && (
              <div className={`sidebar bg-zinc-900 ${isSidebarOpen ? 'w-max md:min-w-0' : ''}`}>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none"
                    onClick={closeSidebar}
                  >
                    X
                  </button>
                </div>

                <div className="user-list">
                  <div>
                    <input
                      className="w-full mt-2 text-white bg-zinc-600 rounded-md p-2 focus:outline-none"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full mt-2 text-white bg-zinc-600 rounded-md p-2 focus:outline-none"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full mt-2 text-white bg-zinc-600 rounded-md p-2 focus:outline-none"
                      name="image"
                      placeholder="Image URL"
                      value={newUser.image}
                      onChange={handleInputChange}
                    />
                    <div className="flex justify-end">
                      <button className="bg-green-500 mt-2 text-white py-2 px-4 rounded-full hover:bg-green-600 end-0 focus:outline-none" onClick={createUser}>
                        Create User
                      </button>
                    </div>
                  </div>
                  <ul>
                    {users.reverse().map((user) => (
                      <li key={user.id}>
                        <div className="post-card mt-2 bg-slate-300 border text-white">
                          <div className="user-info">
                            <img
  src={user.image || "https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png"}
  alt={user.name}
  className="user-avatar"
  style={{ width: "100px", height: "100px" }} 
/>

                            <div className="user-details">
                              <div className='flex-col'>
                                <p className="user-name font-semibold text-black">{user.id}</p>
                                <p className="user-name font-semibold text-black">{user.name}</p>
                              </div>
                              <p className="user-email text-gray-500">@{user.email}</p>
                              <button className="bg-blue-500 text-white- font-medium px-4 py-2 right-0 mx-60 -my- rounded-3xl text-xs">
                                Follow
                              </button>
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


