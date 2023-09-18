import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchPosts();
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

  async function fetchPosts() {
    try {
      const response = await fetch("http://localhost:3005/post");
      if (response.ok) {
        const data = await response.json();
        // Reverse the array to display newly created posts at the top
        setPosts(data.reverse());
      } else {
        console.error("Error fetching posts");
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
        // Fetch posts again to get the updated list with the new post at the top
        fetchPosts();
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deletePost(postId) {
    try {
      const response = await fetch(`http://localhost:3005/post/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting post");
      }

      // Filter the deleted post out of the posts array
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="App flex flex-col">
      <div className="post-container">
        {posts.map((post) => (
          <div className="post-card bg-slate-900" key={post.id}>
            <div className="user-info">
              <img
                src={post.user.image}
                alt={post.user.name}
                className="user-avatar"
              />
              <div className="user-details">
                <p className="user-name text-white">{post.user.name}</p>
                <p className="user-email">@{post.user.email}</p>
              </div>
            </div>
            <div className="post-content">
              <p className="post-caption">{post.caption}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto max-h-96 object-cover"
                />
              )}
            </div>
            <div className="post-actions">
              <button className="action-button">Like</button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none"
                onClick={() => deletePost(post.id)}
              >
                DELETE
              </button>
              <p className="user-likes">{post.likes}</p>
              <p className="user-create text-gray-500 mt-3 mx-auto">{post.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
