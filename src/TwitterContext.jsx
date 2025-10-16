import { createContext, useState } from "react";
import axios from "axios";

const TwitterContext = createContext();

function TwitterContextProvider({ children }) {
  const [tweet, setTweet] = useState([]);
  const [handle, setHandle] = useState();
  const [continuationToken, setContinuationToken] = useState();
  const [token, setToken] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [username, setUsername] = useState()

  function getTweets(username) {
    axios({
      method: "POST",
      url: import.meta.env.VITE_TWITTER_TWEET_ENDPOINT,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        limit: 20,
      },
    })
      .then((response) => {
        setTweet(() => response?.data?.results || []);
        setHandle(response?.data?.results?.user?.username);
        setContinuationToken(response?.data?.continuation_token);
        onIsLoading()
      })
      .catch((error) => {
        console.log(error);
      });
      onIsLoading()
  }

  function onIsLoading(){
    setisLoading(prev => !prev)
  }


  function continueTweets(username) {
    axios({
      method: "POST",
      url: "https://twitter154.p.rapidapi.com/user/tweets/continuation",
      data: {
        username: username,
        continuation_token: continuationToken
        
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_TWITTER_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com",
      },
    })
      .then((response) => {
        setTweet((prevTweets) => [
          ...prevTweets,
          ...(response.data.results || []),
        ]);
        console.log(response.data)
        onIsLoading()
        console.log(response?.data?.continuation_token);
        setContinuationToken(response.data.continuation_token);
        console.log(username)
        setResults(response)
      })
      .catch((error) => {
        console.log(error)
      });
    onIsLoading()
    console.log(continuationToken)
  }

 
// console.log(continuationToken)
  return (
    <TwitterContext.Provider
      value={{ getTweets, continueTweets, tweet,  continuationToken, isLoading, results, setTweet, setResults, setContinuationToken, handle, username, setUsername }}
    >
      {children}
    </TwitterContext.Provider>
  );
}

export { TwitterContext, TwitterContextProvider };