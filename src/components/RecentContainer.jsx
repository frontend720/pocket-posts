import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { TwitterContext } from "../TwitterContext";
import "./RecentContainer.css";
import { ThemeContext } from "../ThemeContext";

export default function RecentContainer({ visible, onRecentUserClick }) {
  const { collectionArr } = useContext(FirebaseContext);
  const { getTweets, continuationToken, continueTweets, tweet, isLoading } =
    useContext(TwitterContext);
  const { theme } = useContext(ThemeContext);

  const filteredArray = collectionArr?.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });

  const uniqueUsernameArr = filteredArray.map((user) => user.username);
  const indexArr = new Set(uniqueUsernameArr);
  const flatUsernameArray = [...indexArr];

  return (
    <>
      <div
        className={theme ? "recent-container-dark" : "recent-container-light"}
        style={visible}
      >
        <h2>Recent Saves</h2>
        <h4 style={isLoading ? { display: "" } : { display: "none" }}>
          Finding Posts
        </h4>
        <div
          style={isLoading ? { display: "none" } : { display: "" }}
          className="recent-container"
        >
          {flatUsernameArray?.map((users) => (
            <div
              className="recent-item"
              key={users}
              onClick={() => onRecentUserClick(users)}
            >
              <label key={users}>{users}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
