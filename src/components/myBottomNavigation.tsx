import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core";
import { Page } from "../App";

type Props = {
  onChangeHandler: Function;
  height?: number;
  currPage: string;
  pages: Page[];
};

export default function MyBottomNavigation(props: Props) {
  const styles = makeStyles({
    body: {
      backgroundColor: "blue",
      height: props.height ? props.height : 64,
    },
    label: {
      color: "white",
    },
    selected: {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  });
  const classes = styles();

  const handleChange = (event: React.ChangeEvent<{}>, newPage: string) => {
    props.onChangeHandler(newPage);
  };

  return (
    <BottomNavigation
      value={props.currPage}
      onChange={handleChange}
      className={classes.body}
    >
      {props.pages.map((page: Page) => (
        <BottomNavigationAction
          key={page.value}
          label={page.label}
          value={page.value}
          classes={{
            label: classes.label,
            selected: classes.selected,
          }}
          icon={<page.icon color="white" size={20} />}
        />
      ))}
    </BottomNavigation>
  );
}
