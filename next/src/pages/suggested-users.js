import React, { useState, useEffect } from 'react';

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3005/user");
      if (response.ok) {
        const data = await response.json();

        // Slice the first 5 users from the fetched data
        const first5Users = data.slice(0, 5);

        setSuggestedUsers(first5Users);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex">
      <div className="w-3/4 p-7">
        {/* Main content of your suggested users page */}
        {/* Add your content here */}
      </div>
      <div className="w-1/3 p-4 border bg-slate-950 fixed top-14 border-slate-500 right-0 h-full">
        <h2 className="text-xl font-semibold mb-4 text-white">Suggested Users</h2>
        <ul>
          {suggestedUsers.map((user) => (
            <li key={user.id}>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-lg mt-3 font-semibold text-white">{user.name}</p>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    Follow
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestedUsers;
