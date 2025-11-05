import { useContext, useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaTimeDisplay,
} from "media-chrome/react";
import { MediaPlaybackRateButton } from "../StyleSheet";
import { ThemeContext } from "../ThemeContext";
import "./Bookmarks.css";
import { FirebaseContext } from "../FirebaseContext";
import { IoClose } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImFilm } from "react-icons/im";
import { RiLoopLeftFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";

const Bookmarks = () => {
  const [arr, setArr] = useState(0);
  const [videoIndex, setVideoIndex] = useState([]);
  const { collectionArr, getMedia, deleteMedia, deletedDoc } =
    useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [seek, setSeek] = useState(0);
  const [auto, setAuto] = useState(false);
  const [filter, setFilter] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  function modalChange() {
    setDeleteModal((prev) => !prev);
  }

  function loopChange() {
    setIsLooping((prev) => !prev);
  }

  function isAutoPlaying() {
    setAuto((prev) => !prev);
  }

  useEffect(() => {
    getMedia();
  }, [deletedDoc]);

  const playbackRate = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2,
  ];
  const [rate, setRate] = useState(9);
  function changePlaybackRate() {
    setRate((prev) => (prev + 1) % playbackRate.length);
  }

  function nextVideo() {
    setSeek((prev) => prev + 1);
  }
  function lastVideo() {
    setSeek((prev) => (prev - 1) % collectionArr?.length);
  }

  const mediaControllerRef = useRef(null);
  const reactPlayerRef = useRef(null);

  function handlePlayerReady() {
    const interal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = interal;
    }
  }

  const sortedCollection = collectionArr?.sort((a, b) => {
    if (filter) {
      return a?.timestamp - b?.timestamp;
    } else {
      return b?.timestamp - a?.timestamp;
    }
  });

  function onFilterChange() {
    setFilter((prev) => !prev);
  }

  useEffect(() => {
    setSeek(0);
  }, [filter, collectionArr.length]);


  useEffect(() => {
    modalChange()
  }, [deletedDoc])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={theme ? "toolbar-dark" : "toolbar-light"}>
          <IonTitle>{sortedCollection[seek]?.username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className={theme ? "content-dark" : "content-light"}
      >
        <IonHeader collapse="condense">
          <IonToolbar className={theme ? "content-dark" : "content-light"}>
            <IonTitle
              style={
                theme
                  ? { color: "#444444", fontWeight: "600 !important" }
                  : { color: "#dadada", fontWeight: "600 !important" }
              }
              // size="small"
            >
              {sortedCollection[seek]?.username}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div
          style={deleteModal ? { display: "" } : { display: "none" }}
          className="delete-modal"
        >
          <label onClick={modalChange} style={theme? { right: 0, margin: 24, color: "#222222" }:{ right: 0, margin: 24, color: "#dadada" }} htmlFor="">
            Cancel
          </label>
          <h2 style={theme? { right: 0, margin: 24, color: "#222222" }:{ right: 0, margin: 24, color: "#dadada" }}>Delete Video?</h2>
          <button
            onClick={() => deleteMedia(sortedCollection[seek]?.timestamp)}
            className="delete-button"
          >
            <label htmlFor="" onChange={modalChange}>
              Delete
            </label>
          </button>
        </div>
        {collectionArr.length === 0 ? (
          <div className={theme ? "card" : "card-dark"}>
            <p>Save some tweets to view them here</p>
            <ImFilm color={theme ? "#444444" : "#dadada"} size=" 60px" />
          </div>
        ) : (
          <div style={deleteModal ? { display: "none" } : { display: "" }}>
            <MediaController>
              <ReactPlayer
                slot="media"
                width="100vw"
                // height="500px"
                height="100vh"
                src={sortedCollection[seek]?.post}
                ref={reactPlayerRef}
                onReady={handlePlayerReady}
                playbackRate={playbackRate[rate]}
                onEnded={auto ? nextVideo : undefined}
                playing={auto}
                loop={isLooping ? true : false}
              />
              <MediaControlBar>
                <MediaPlaybackRateButton
                  disabled={seek === 0 ? true : false}
                  // style={seek === 0 ? { opacity: 0 } : { opacity: 1 }}
                  onClick={lastVideo}
                >
                  <GrPrevious
                    style={seek === 0 ? { opacity: 0 } : { opacity: 1 }}
                  />
                </MediaPlaybackRateButton>
                <MediaPlayButton />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaFullscreenButton />
                <MediaPlaybackRateButton onClick={changePlaybackRate}>
                  {playbackRate[rate]} <IoClose />
                </MediaPlaybackRateButton>
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton
                  style={
                    seek === collectionArr.length - 1
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                  onClick={nextVideo}
                  disabled={seek === collectionArr.length - 1 ? true : false}
                >
                  <GrNext />
                </MediaPlaybackRateButton>
              </MediaControlBar>
            </MediaController>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    padding: 6,
                    background: "#292929ff",
                    borderRadius: 6,
                    margin: "12px",
                  }}
                  onClick={modalChange}
                >
                  <IoClose size="14px" color="#dadada" />
                </button>

                <button
                  style={{
                    padding: 6,
                    background: "#292929ff",
                    borderRadius: 6,
                    margin: "12px 0px",
                  }}
                  onClick={isAutoPlaying}
                >
                  <label
                    style={{ fontSize: 16, color: "#e8e8e8" }}
                    htmlFor=""
                  >{`Turn ${auto ? "off" : "on"} autoplay`}</label>
                </button>
                <div style={auto ? { display: "none" } : { display: "" }}>
                  <button
                    style={{
                      padding: 6,
                      background: "#292929ff",
                      borderRadius: 6,
                      margin: "12px",
                    }}
                    onClick={loopChange}
                  >
                    {isLooping ? (
                      <FaPlay color="#dadada" size="14px" />
                    ) : (
                      <RiLoopLeftFill
                        style={{ textDecoration: "line-through" }}
                        size="16px"
                        color="#dadada"
                      />
                    )}
                  </button>
                </div>
              </div>
              <label
                style={theme ? { color: "#444444" } : { color: "#dadada" }}
                className={
                  collectionArr.length === 0
                    ? "count-label-hidden"
                    : "count-label-visible"
                }
                htmlFor=""
              >
                {seek + 1} of {collectionArr?.length}
              </label>
              <button
                style={{
                  padding: 6,
                  marginTop: 16,
                  background: "#292929ff",
                  color: "#e8e8e8",
                  marginBottom: 36,
                }}
                onClick={onFilterChange}
              >
                {filter ? "Ascending" : "Descending"}
              </button>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;
