import React, { useState } from "react";
import MainPage from "./pages/main";
import QueuePage from "./pages/queue";
import LibraryPage from "./pages/library";
import FavoritesPage from "./pages/favorites";
import MyBottomNavigation from "./components/myBottomNavigation";
import MyDrawerNavigation from "./components/myDrawerNavigation";
import {  makeStyles, useMediaQuery } from "@material-ui/core";
import { FaBars } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdQueueMusic,
} from "react-icons/md";
import { fetchVideoSearch, VideoData } from "./services/httpClient";

export default function App() {
  const [currPage, setCurrPage] = useState("main");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isNormalScreen = useMediaQuery("(min-width: 641px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [httpSearchString, setHttpSearchString] = useState(String);
  const [httpSearchResult, setHttpSearchResult] = useState(testData);
  const [librarySearchString, setLibrarySearchString] = useState(String);
  const [librarySearchResult, setLibrarySearchResult] = useState(Array<VideoData>());
  const navHeight = 64;
  const drawerWidth = 240;
  const pages: Page[] = [
    {
      label: "Main",
      value: "main",
      icon: MdHome,
    },
    {
      label: "Queue",
      value: "queue",
      icon: MdQueueMusic,
    },
    {
      label: "Library",
      value: "library",
      icon: MdLibraryMusic,
    },
    {
      label: "Favorites",
      value: "favorites",
      icon: MdFavorite,
    },
  ];

  const styles = makeStyles({
    drawerNavButton: {
      height: navHeight - 30,
      width: navHeight - 30,
      padding: 15,
      color: "white",
      position: "absolute",
      zIndex: 1,
    },
    normalPageContainer: {
      height: "100%",
      width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
      marginLeft: drawerOpen ? drawerWidth : 0,
      transition: "width 0.2s ease-out,margin 0.2s ease-out",
      overflow:"hidden"
    },
    smallPageContainer: {
      height: `calc(100% - ${navHeight}px)`,
      overflow:"hidden"
    },
  });

  const classes = styles();
  return (
    <React.Fragment>
      {
        //Hidden in small screens
        isNormalScreen && (
          <React.Fragment>
            <MyDrawerNavigation
              onClickHandler={(newPage: string) => {
                setCurrPage(newPage);
              }}
              drawerWidth={drawerWidth}
              open={drawerOpen}
              handleDrawerClose={() => {
                setDrawerOpen(false);
              }}
              currPage={currPage}
              pages={pages}
            />
            {!drawerOpen && (
              <FaBars
                onClick={() => setDrawerOpen(true)}
                className={classes.drawerNavButton}
              />
            )}
          </React.Fragment>
        )
      }
      <div
        id="page-container"
        className={isNormalScreen
          ? classes.normalPageContainer
          : isSmallScreen
          ? classes.smallPageContainer
          : undefined}
      >
        {(currPage === "main" && (
          <MainPage
            toolBarHeight={navHeight}
            isNormalScreen={isNormalScreen}
            isSmallScreen={isSmallScreen}
            searchString={httpSearchString}
            searchResults={httpSearchResult}
            searchStringChangeHandler={(string:string)=>{
              setHttpSearchString(string)
            }}
            submitSearchHandler={async ()=>{
            setHttpSearchResult(await fetchVideoSearch(httpSearchString));
            }}
          />
        )) ||
          (currPage === "queue" && <QueuePage />) ||
          (currPage === "library" && <LibraryPage />) ||
          (currPage === "favorites" && <FavoritesPage />)}
      </div>
      {
        //Hidden in big screens
        isSmallScreen && (
          <MyBottomNavigation
            currPage={currPage}
            onChangeHandler={(newPage: string) => {
              setCurrPage(newPage);
            }}
            height={navHeight}
            pages={pages}
          />
        )
      }
    </React.Fragment>
  );
}
export type Page = {
  label: string;
  value: string;
  icon: IconType;
};
const testData: VideoData[] = [
  {
    etag: "jI1tYIrf6pGn6UtoYB9bOMceGSM",
    id: {
      kind: "youtube#video",
      videoId: "RUQl6YcMalg",
    },
    kind: "youtube#searchResult",
    snippet: {
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      channelTitle: "BillieEilishVEVO",
      description:
        "Listen to “Therefore I Am”, out now: https://smarturl.it/ThereforeIAm Directed by Billie Eilish Follow Billie Eilish: Facebook: https://www.facebook.com/billieeilish ...",
      liveBroadcastContent: "none",
      publishTime: "2020-11-12T18:00:11Z",
      publishedAt: "2020-11-12T18:00:11Z",
      thumbnails: {
        default: {
          height: 90,
          url: "https://i.ytimg.com/vi/RUQl6YcMalg/default.jpg",
          width: 120,
        },
        high: {
          height: 360,
          url: "https://i.ytimg.com/vi/RUQl6YcMalg/hqdefault.jpg",
          width: 480,
        },
        medium: {
          height: 180,
          url: "https://i.ytimg.com/vi/RUQl6YcMalg/mqdefault.jpg",
          width: 320,
        },
      },
      title: "Billie Eilish - Therefore I Am (Official Music Video)",
    },
  },
  {
    etag: "mHcrJWiMySjG6K9i3Wsu81BXF_s",
    id: {
      kind: "youtube#video",
      videoId: "Dm9Zf1WYQ_A",
    },
    kind: "youtube#searchResult",
    snippet: {
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      channelTitle: "BillieEilishVEVO",
      description:
        "Listen to “my future”, out now: https://smarturl.it/myfuture Follow Billie Eilish: Facebook: https://www.facebook.com/billieeilish Instagram: ...",
      liveBroadcastContent: "none",
      publishTime: "2020-07-30T23:00:01Z",
      publishedAt: "2020-07-30T23:00:01Z",
      thumbnails: {
        default: {
          height: 90,
          url: "https://i.ytimg.com/vi/Dm9Zf1WYQ_A/default.jpg",
          width: 120,
        },
        high: {
          height: 360,
          url: "https://i.ytimg.com/vi/Dm9Zf1WYQ_A/hqdefault.jpg",
          width: 480,
        },
        medium: {
          height: 180,
          url: "https://i.ytimg.com/vi/Dm9Zf1WYQ_A/mqdefault.jpg",
          width: 320,
        },
      },
      title: "Billie Eilish - my future",
    },
  },
  {
    etag: "F8lEIA9cO98PBv-LrHuWmT_gT_E",
    id: {
      kind: "youtube#video",
      videoId: "soCmD9b4ros",
    },
    kind: "youtube#searchResult",
    snippet: {
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      channelTitle: "BillieEilishVEVO",
      description:
        "Listen to “Therefore I Am”, out now: https://smarturl.it/ThereforeIAm Follow Billie Eilish: Facebook: https://www.facebook.com/billieeilish Instagram: ...",
      liveBroadcastContent: "none",
      publishTime: "2020-11-24T04:00:11Z",
      publishedAt: "2020-11-24T04:00:11Z",
      thumbnails: {
        default: {
          height: 90,
          url: "https://i.ytimg.com/vi/soCmD9b4ros/default.jpg",
          width: 120,
        },
        high: {
          height: 360,
          url: "https://i.ytimg.com/vi/soCmD9b4ros/hqdefault.jpg",
          width: 480,
        },
        medium: {
          height: 180,
          url: "https://i.ytimg.com/vi/soCmD9b4ros/mqdefault.jpg",
          width: 320,
        },
      },
      title:
        "Billie Eilish - Therefore I Am (Live from the American Music Awards / 2020)",
    },
  },
  {
    etag: "NIgQGcE59BvFyimg2bCKqLTDtrI",
    id: {
      kind: "youtube#video",
      videoId: "EgBJmlPo8Xw",
    },
    kind: "youtube#searchResult",
    snippet: {
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      channelTitle: "BillieEilishVEVO",
      description:
        "Listen to “everything i wanted”, out now: http://smarturl.it/everythingiwanted Directed by Billie Eilish Developed/Edited by John Paul Horstmann VFX by Ingenuity ...",
      liveBroadcastContent: "none",
      publishTime: "2020-01-23T20:00:02Z",
      publishedAt: "2020-01-23T20:00:02Z",
      thumbnails: {
        default: {
          height: 90,
          url: "https://i.ytimg.com/vi/EgBJmlPo8Xw/default.jpg",
          width: 120,
        },
        high: {
          height: 360,
          url: "https://i.ytimg.com/vi/EgBJmlPo8Xw/hqdefault.jpg",
          width: 480,
        },
        medium: {
          height: 180,
          url: "https://i.ytimg.com/vi/EgBJmlPo8Xw/mqdefault.jpg",
          width: 320,
        },
      },
      title: "Billie Eilish - everything i wanted",
    },
  },
  {
    etag: "c14WBrFFZud0oQHMZmMNxDk-AHc",
    id: {
      kind: "youtube#video",
      videoId: "pbMwTqkKSps",
    },
    kind: "youtube#searchResult",
    snippet: {
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      channelTitle: "BillieEilishVEVO",
      description:
        'Listen to "when the party\'s over" from the debut album “WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?”, out now: http://smarturl.it/BILLIEALBUM Follow ...',
      liveBroadcastContent: "none",
      publishTime: "2018-10-25T16:00:14Z",
      publishedAt: "2018-10-25T16:00:14Z",
      thumbnails: {
        default: {
          height: 90,
          url: "https://i.ytimg.com/vi/pbMwTqkKSps/default.jpg",
          width: 120,
        },
        high: {
          height: 360,
          url: "https://i.ytimg.com/vi/pbMwTqkKSps/hqdefault.jpg",
          width: 480,
        },
        medium: {
          height: 180,
          url: "https://i.ytimg.com/vi/pbMwTqkKSps/mqdefault.jpg",
          width: 320,
        },
      },
      title: "Billie Eilish - when the party&#39;s over",
    },
  },
];
