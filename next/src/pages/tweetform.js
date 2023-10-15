import React, { useState, useEffect } from "react";
import { API_URL } from "@/config";

const YourComponent = () => {
  const [userId, setUserId] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postImage, setPostImage] = useState("");
  const [posts, setPosts] = useState([]);

 
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch(API_URL + "/post");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function addTweet() {
    try {
      const response = await fetch(API_URL + "/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          caption: postCaption,
          image: postImage,
        }),
      });

      if (response.ok) {
     
        await fetchPosts();
       
        setUserId("");
        setPostCaption("");
        setPostImage("");
        window.location.href="./";
      } else {
        console.error("Error adding tweet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="your-component-container flex-col">
      <div className="form-container mx-4 md:mx-10 my-10 p-4 shadow-xl w-full rounded-lg md:w-max lg:w-max sm:mt-10">
        <div>
          <div className="my-10">
            <textarea
              className="w-full bg-gray-800 rounded-xl p-2 focus:outline-none"
              rows="2"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            ></textarea>
            <textarea
              className="w-full mt-2 bg-gray-800 rounded-xl p-2 focus:outline-none"
              rows="3"
              placeholder="What's Happening?"
              value={postCaption}
              onChange={(e) => setPostCaption(e.target.value)}
            ></textarea>
            <input
              type="text"
              className="w-full mt-2 bg-gray-800 rounded-xl p-2 focus:outline-none"
              placeholder="Enter Image URL (Optional)"
              value={postImage}
              onChange={(e) => setPostImage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none mt-2"
              onClick={addTweet}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>

     
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id}>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
