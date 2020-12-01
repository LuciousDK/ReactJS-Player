import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FaChevronLeft } from "react-icons/fa";
import { Page } from "../App";

type Prop = {
  open: boolean;
  handleDrawerClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  drawerWidth: number;
  pages: Page[];
  currPage: string;
  onClickHandler: (newPage: string) => void;
};

export default function PersistentDrawerLeft(props: Prop) {
  //Styles
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        width: props.drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: props.drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
    })
  );
  const classes = useStyles();
  const handleClic = (event: React.MouseEvent<{}>, newPage: string) => {
    props.onClickHandler(newPage);
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          <FaChevronLeft color={"blue"} />
        </IconButton>
      </div>
      <Divider />
      <List>
        {props.pages.map((page: Page) => (
          <ListItem
            button
            key={page.value}
            onClick={(event) => {
              handleClic(event,page.value);
            }}
          >
            <ListItemIcon>
              <page.icon color={"blue"} size={30} />
            </ListItemIcon>
            <ListItemText
              primary={page.label}
              style={{
                color: "blue",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
