import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MyToolBar from "../components/myToolbar";
import VideoTab from "../components/videoTab";
import { VideoData, fetchVideoSearch } from "../services/httpClient";

type Prop = {
  toolBarHeight: number;
  isSmallScreen: boolean;
  isNormalScreen: boolean;
  searchString: string;
  searchStringChangeHandler: Function;
  searchResults: VideoData[];
  submitSearchHandler: Function;
};
export default function Main(props: Prop) {
  const styles = makeStyles({
    bodyContainer: {
      height: `calc(100% - ${props.toolBarHeight}px)`,
      overflow: "auto",
      marginBottom: "64px",
    },
  });

  const classes = styles();

  return (
    <React.Fragment>
      <MyToolBar
        submitHandler={() => {
          props.submitSearchHandler();
        }}
        inputChangeHandler={(string: string) => {
          props.searchStringChangeHandler(string);
        }}
        height={props.toolBarHeight}
        value={props.searchString}
      />
      <div className={classes.bodyContainer}>
        {props.searchResults.map((item: VideoData) => (
          <VideoTab key={item.etag} data={item} />
        ))}
      </div>
    </React.Fragment>
  );
}
