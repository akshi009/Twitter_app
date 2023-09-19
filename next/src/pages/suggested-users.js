import React, { useState, useEffect } from 'react';

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    fetchUsers();
    
    window.addEventListener('resize', handleResize);
    
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    
    setIsSmallScreen(window.innerWidth <= 1168); 
  };

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3005/user");
      if (response.ok) {
        const data = await response.json();
        
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
    !isSmallScreen && (
      <div className="flex">
        <div className="w-3/4 p-7"></div>
        <div className="w-1/3 p-4  bg-zinc-900 fixed top-20 rounded-3xl right-5 h-auto">
          <h2 className="text-xl font-semibold mb-4 text-white">Who to Follow</h2>
          <ul>
            {suggestedUsers.map((user) => (
              <li key={user.id}>
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className='flex flex-col'>
                      <p className="text-lg mt-3 font-semibold text-white">{user.name}</p>
                      <button className="bg-white text-black font-medium px-4 py-2 right-0 mx-60 -my-4 rounded-3xl text-xs">
                        Follow
                      </button>
                    </div>
                    <p className="text-sm  font-normal text-gray-500">@{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default SuggestedUsers;
