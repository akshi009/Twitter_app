import React, { useState } from 'react';
import Head from 'next/head';
import NavigationBar from './nav'; // Correct file name 'nav.js'
import SuggestedUsers from './suggested-users'; // Correct file name 'suggested-users.js'
import TweetForm from "./tweetform";
import TweetList from "./tweetlist";

export default function Home() {
  const [tweets, setTweets] = useState([]);

  const handleTweetSubmit = (content) => {
    const newTweet = {
      id: Date.now(),
      content,
    };
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        {/* Add your meta tags and other head elements here */}
      </Head>

      <NavigationBar />

      {/* Your page content goes here */}
      <main>
        {/* Add more content here */}
        <SuggestedUsers />
        <TweetForm onTweetSubmit={handleTweetSubmit} />
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
}
