import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PostContainer from "../components/PostContainer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./Feed.css";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import {
  MoreButton,
  InputContainer,
  SearchInput,
  SearchButton,
} from "../StyleSheet";
import { IoSearch } from "react-icons/io5";
import { TwitterContext } from "../TwitterContext";
import { ThemeContext } from "../ThemeContext";
import RecentContainer from "../components/RecentContainer";
import { RiResetLeftLine } from "react-icons/ri";

dayjs.extend(relativeTime);

const Feed = () => {
  const { theme } = useContext(ThemeContext);
  const { savedVideo, getMedia } = useContext(FirebaseContext);
  const { getTweets, tweet, isLoading, continueTweets, results, setTweet, setResults, setContinuationToken } =
    useContext(TwitterContext);
  const [isClicked, setIsClicked] = useState(true);
  const [username, setUsername] = useState("");

  const [savedText, setSavedText] = useState("");
  function handleSaveClick() {
    setIsClicked((prev) => !prev);
    setSavedText("saved");
    return () => id;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSavedText("");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  function handleRecentUserClick(user) {
    setUsername(user);
    getTweets(user);
  }

  useEffect(() => {
    getMedia();
  }, [isClicked]);

  function resetTweets(){
    setTweet([])
    setResults(null)
    setContinuationToken(null)
    setUsername("")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={theme ? "toolbar-dark" : "toolbar-light"}>
          <InputContainer>
          <button onClick={resetTweets} style={tweet?.length ? {background: "none"}: {display: "none"}}>
            <RiResetLeftLine color={theme ? "#222222" : "#dadada"} size="24px" style={{marginRight: 8}} />
          </button>
            <SearchInput
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search User"
              className={theme ? "input-dark" : "input-light"}
            />
            <SearchButton onClick={() => getTweets(username.toLowerCase().trim())}>
              <IoSearch color={theme ? "#222222" : "#dadada"} />
            </SearchButton>
          </InputContainer>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className={theme ? "content-dark" : "content-light"}
        fullscreen
      >
        <IonHeader collapse="condense">
          <IonToolbar className={theme ? "toolbar-dark" : "toolbar-light"}>
            <IonTitle size="large">{tweet?.[0]?.user?.username}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RecentContainer
          onRecentUserClick={handleRecentUserClick}
          visible={tweet?.length === 0 ? { display: "" } : { display: "none" }}
        />
        {tweet?.map((tweet) => (
          <div key={tweet.tweet_id} className="card-container">
            <PostContainer
              wrapper_visibility={
                tweet.video_url === null && tweet?.media_url === null
                  ? { display: "none" }
                  : { display: "" }
              }
              username={tweet?.user?.username}
              timestamp={tweet?.creation_date}
              userImage={tweet?.user?.profile_pic_url}
              pic_visibility={tweet?.user?.profile_pic_url === null ? {display: "none"} : {display: ""}}
              height={tweet?.extended_entities?.media[0]?.sizes?.small?.h}
              url={
                tweet.video_url !== null
                  ? tweet?.video_url[tweet?.video_url?.length - 1]?.url
                  : null
              }
              post={tweet.text}
              player_visibility={
                tweet.video_url === null ? { display: "none" } : { display: "" }
              }
              image={tweet?.media_url?.map((image) => image)}
              media_bar_visibility={
                tweet?.media_url?.length === 0 || tweet.video_url === null
                  ? { display: "none" }
                  : { display: "" }
              }
              saveButton={() =>
                savedVideo(
                  tweet?.video_url[tweet?.video_url?.length - 1]?.url,
                  tweet?.user?.username
                )
              }
              isSaved={handleSaveClick}
              heart_color={"#dadada"}
              is_save_button_visible={
                tweet?.video_url === null
                  ? { opacity: 0 }
                  : {
                      padding: 6,
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "right",
                      alignItems: "center",
                    }
              }
              save_text={savedText}
            />
          </div>
        ))}
        <MoreButton
          style={tweet.length === 0 ? { display: "none" } : { display: "" }}
          onClick={() => continueTweets(username)}
          className={
            results?.data?.results < 20
              ? "more-button-hidden"
              : "more-button-visible"
          }
        >
          <label style={theme ? {color: "#222222"} : {color: "#dadada"}} htmlFor="">
          {isLoading ? "Loading" : "More"}
          </label>
        </MoreButton>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
