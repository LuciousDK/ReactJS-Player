import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { VideoData } from "../services/httpClient";
import { XmlEntities } from "html-entities";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  isInFavorites,
  isInLibrary,
  removeFromFavorites,
  removeFromLibrary,
  saveToFavorites,
  saveToLibrary,
} from "../services/localStorage";

type Prop = {
  data: VideoData;
  height?: number;
  playing: boolean;
  handlePlayVideo: Function;
};

export default function VideoTab(props: Prop) {
  const [auxState, setAuxState] = useState(true);
  const classes = styles();
  return (
    <div className={classes.container}>
      <img
        src={props.data.snippet.thumbnails.high.url}
        alt="Video Thumbnail"
        className={classes.thumbnail}
      />
      <div className={classes.description}>
        <h1 className={`${classes.descriptionText} ${classes.videoTitle}`}>
          {XmlEntities.decode(props.data.snippet.title)}
        </h1>
        <h1 className={classes.descriptionText}>
          {XmlEntities.decode(props.data.snippet.channelTitle)}
        </h1>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              if (isInFavorites(props.data.id.videoId))
                removeFromFavorites(props.data.id.videoId);
              else saveToFavorites(props.data);
              setAuxState(!auxState);
            }}
          >
            {isInFavorites(props.data.id.videoId) ? (
              <MdFavorite size={"32px"} 
          color={"red"}/>
            ) : (
              <MdFavoriteBorder size={"32px"}color={"red"} />
            )}
          </Button>
          <Button
            onClick={() => {
              props.handlePlayVideo(props.data.id.videoId);
            }}
          >
            {props.playing ? (
              <FaPause size={"32px"} />
            ) : (
              <FaPlay size={"32px"} />
            )}
          </Button>
          <Button
            onClick={() => {
              if (isInLibrary(props.data.id.videoId))
                removeFromLibrary(props.data.id.videoId);
              else saveToLibrary(props.data);
              setAuxState(!auxState);
            }}
          >
            {isInLibrary(props.data.id.videoId) ? (
              <BsBookmarkFill size={"32px"} />
            ) : (
              <BsBookmarkPlus size={"32px"}/>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

//Style templates
const styles = makeStyles({
  container: {
    height: 100,
    borderRadius: "4px",
    margin: "10px",
    backgroundColor: "lightgrey",
    transition: "height 0.15s ease-out",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    boxShadow: "2px 2px 2px rgba(0,0,0,0.5)",
  },
  thumbnail: {
    height: "100%",
    boxShadow: "1px 0 2px rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  description: {
    flexDirection: "column",
    width: "100%",
    position: "relative",
  },
  descriptionText: {
    textAlign: "center",
    // width: "100%",
    padding: "0 10px",
    fontSize: 12,
  },
  videoTitle: {
    paddingTop: "10px",
    fontSize: 16,
    fontWeight: "bold",
    maxHeight: "2em",
    overflow: "hidden",
  },
  buttons: {
    textAlign: "center",
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    "& > *": {
      color: "blue",
      // border:"3px red solid",
      padding: 0,
      minWidth: "0px",
      height: "42px",
      width: "42px",
      margin: "0 10px",
    },
  },
});
