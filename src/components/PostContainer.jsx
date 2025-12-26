import React, { useContext, useRef, useState, useEffect } from "react";
import {
  Card,
  UsernameText,
  Timestamp,
  PostText,
  UserImage,
  MediaPlaybackRateButton,
  MoreButton,
} from "../StyleSheet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Swiper, SwiperSlide } from "swiper/react";
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
import { IoClose, IoHeart } from "react-icons/io5";
import { ThemeContext } from "../ThemeContext";
import "swiper/css";
import "swiper/css/pagination";
import "./PostContainer.css";
import { Pagination, Thumbs } from "swiper/modules";

dayjs.extend(relativeTime);

export default function PostContainer({
  username,
  timestamp,
  userImage,
  post,
  url,
  player_visibility,
  media_bar_visibility,
  wrapper_visibility,
  image,
  saveButton,
  isSaved,
  heart_color,
  is_save_button_visible,
  save_text,
  poster,
  visibleId,
  index,
  pic_visibility,
  height,
  loop,
}) {
  const { theme } = useContext(ThemeContext);
  const mediaControllerRef = useRef(null);
  const reactPlayerRef = useRef(null);

  function handlePlayerReady() {
    const interal = reactPlayerRef.current.getInternalPlayer();
    if (mediaControllerRef.current) {
      mediaControllerRef.current.media = interal;
    }
  }

  const [rate, setRate] = useState(9);
  const playbackRate = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2,
  ];

  function changePlaybackRate() {
    setRate((prev) => (prev + 1) % playbackRate.length);
  }

  const itemsRef = useRef([]);
  // Manage the ID of the currently active item
  const [activeId, setActiveId] = useState(null);
  return (
    <Card
      className={theme ? "card-dark" : "card-light"}
      style={wrapper_visibility}
    >
      <div className="social-card-header">
        <div>
          <div className="username-flex-box">
            <UserImage style={pic_visibility} src={userImage} />
            <UsernameText>{username}</UsernameText>
          </div>
        </div>
        <Timestamp>{dayjs(timestamp).fromNow()}</Timestamp>
      </div>
      <>
        <MediaController>
          <ReactPlayer
            slot="media"
            width="100vw"
            height={height}
            className="video-player"
            src={url}
            onReady={handlePlayerReady}
            style={player_visibility}
            playbackRate={playbackRate[rate]}
            loop={loop}
            preload="true"
            config={{
              file: {
                attributes: {
                  referrerPolicy: "no-referrer",
                },
              },
            }}
          />
          <MediaControlBar className="control-bar" style={media_bar_visibility}>
            <MediaPlayButton />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaPlaybackRateButton onClick={changePlaybackRate}>
              {playbackRate[rate]} <IoClose />
            </MediaPlaybackRateButton>
            {/* <MediaMuteButton /> */}
            <MediaVolumeRange />
            <MediaFullscreenButton />
          </MediaControlBar>
        </MediaController>
        {image && image.length > 0 && (
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination, Thumbs]}
            className="option-press"
          >
            {image.map((imageURL, index) => (
              <SwiperSlide key={index}>
                <img src={imageURL} width="100%" alt={`Post image ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </>
      <div className="social-card-footer">
        <PostText>{post}</PostText>
      </div>
      <div className="save-container" style={is_save_button_visible}>
        <label htmlFor="" style={{ marginRight: 15 }}>
          {save_text}
        </label>
        <button
          style={{
            background: "transparent",
          }}
          onClick={saveButton}
        >
          <IoHeart onClick={isSaved} color={heart_color} size="24px" />
        </button>
      </div>
    </Card>
  );
}
