import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core";
import {Page} from "../App"

const styles = makeStyles({
  root: {
    backgroundColor: "blue",
  },
  label: {
    color: "white",
  },
  selected: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

type Props = {
  onChangeHandler: Function;
  height?: number;
  currPage: string;
  pages: Page[]
};


export default function MyBottomNavigation(props: Props) {
  const styleClasses = styles();

  const handleChange = (event: React.ChangeEvent<{}>, newPage: string) => {
    props.onChangeHandler(newPage);
  };


  return (
    <BottomNavigation
      value={props.currPage}
      onChange={handleChange}
      className={styleClasses.root}
      style={{ height: props.height ? props.height : 64 }}
    >
      {props.pages.map((page:Page)=>(
        <BottomNavigationAction
        label={page.label}
        value={page.value}
        classes={{
          label: styleClasses.label,
          selected: styleClasses.selected,
        }}
        icon={<page.icon color="white" size={20} />}
      />
      ))}
      {/* <BottomNavigationAction
        label="Main"
        value="main"
        classes={{
          label: styleClasses.label,
          selected: styleClasses.selected,
        }}
        icon={<MdHome color="white" size={20} />}
      />
      <BottomNavigationAction
        label="Queue"
        value="queue"
        classes={{
          label: styleClasses.label,
          selected: styleClasses.selected,
        }}
        icon={<MdQueueMusic color="white" size={20} />}
      />
      <BottomNavigationAction
        label="Library"
        value="library"
        classes={{
          label: styleClasses.label,
          selected: styleClasses.selected,
        }}
        icon={<MdLibraryMusic color="white" size={20} />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        classes={{
          label: styleClasses.label,
          selected: styleClasses.selected,
        }}
        icon={<MdFavorite color="white" size={20} />}
      /> */}
    </BottomNavigation>
  );
}
