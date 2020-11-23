import React, { useState } from "react";
import MainPage from "./pages/main";
import QueuePage from "./pages/queue";
import LibraryPage from "./pages/library";
import FavoritesPage from "./pages/favorites";
import MyBottomNavigation from "./components/myBottomNavigation";
import MyDrawerNavigation from "./components/myDrawerNav";
import { useMediaQuery } from "@material-ui/core";
import { FaBars } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdQueueMusic,
} from "react-icons/md";

export default function App() {
  const [currPage, setCurrPage] = useState("main");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isNormalScreen = useMediaQuery("(min-width: 641px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
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
              <div
                style={{
                  height: navHeight,
                  width: navHeight,
                  position: "absolute",
                  zIndex: 1,
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <FaBars
                  style={{
                    height: navHeight - 30,
                    width: navHeight - 30,
                    padding: 15,
                    color: "white",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        )
      }
      <div
        id="page-container"
        style={
          isNormalScreen
            ? {
                height: "100%",
                width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
                marginLeft: drawerOpen ? drawerWidth : 0,
                transition: "width 0.2s ease-out,margin 0.2s ease-out",
              }
            : isSmallScreen
            ? { height: `calc(100% - ${navHeight}px)` }
            : undefined
        }
      >
        {(currPage === "main" && <MainPage toolBarHeight={navHeight} />) ||
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
