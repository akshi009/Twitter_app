import React, { useEffect, useState } from "react";

function TrendingPage() {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const [postLikes, setPostLikes] = useState({});

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
        setPosts(data.reverse());

     
        const initialLikes = {};
        data.forEach((post) => {
          initialLikes[post.id] = post.likes;
        });
        setPostLikes(initialLikes);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchTrendingPosts() {
    try {
   
      const response = await fetch("http://localhost:3005/post");
      if (response.ok) {
        const data = await response.json();
        setTrendingPosts(data);
      } else {
        console.error("Error fetching trending posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleLikeClick(postId) {
    // Increment the like count for the post
    setPostLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: prevLikes[postId] + 1,
    }));

    // You can also send a request to your server to update the like count in the database here
  }

  return (
    <div className="TrendingPage">
      <h1 className="text-3xl font-semibold mb-4">Trending Posts</h1>
      <div className="trending-post-container">
        {trendingPosts.map((post) => (
         <div className="post-card bg-zinc-900" key={post.id}>
         <div className="user-info">
           <img
             src={post.user.image}
             alt={post.user.name}
             className="user-avatar"
           />
           <div className="user-details">
             <p className="user-name text-white">{post.user.name}</p>
             <p className="user-email">@{post.user.email}</p>
             <p className="user-create text-gray-500  mx-auto">
             {post.createdAt}
           </p>
           </div>
         </div>
         <div className="post-content">
           <p className="post-caption">{post.caption}</p>
           {post.image && (
             <img
               src={post.image}
               alt="Post"
               className="w-full h-auto max-h-96 rounded-xl object-cover"
             />
           )}
         </div>
         <div className="post-actions flex-col  ">
           <div className="flex -mx-2 mt-5">
           <div className="flex-row">
            <button
             className="action-button"
             onClick={() => handleLikeClick(post.id)}
            >
             Like
            </button>
            <p className="user-likes">{postLikes[post.id]} Likes</p></div>
           <button
             className="bg-red-500 text-white py-2 h-10 px-4 rounded-full hover:bg-red-600 focus:outline-none"
             onClick={() => deletePost(post.id)}
           >
             DELETE
           </button></div>
           
         </div>
       </div>   
        ))}
      </div>
    </div>
  );
}

export default TrendingPage;
