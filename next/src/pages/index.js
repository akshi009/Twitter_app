import React, { useState } from 'react';
import Head from 'next/head';
import NavigationBar from './nav'; 
import SuggestedUsers from './suggested-users'; 
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
        
      </Head>

      <NavigationBar />

     
      <main>
        
        <SuggestedUsers />
        <TweetForm onTweetSubmit={handleTweetSubmit} />
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
}
