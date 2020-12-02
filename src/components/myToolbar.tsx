
import {
  Button,
  makeStyles,
  TextField,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

//Props of component
type Prop = {
  submitHandler: Function;
  height?: number;
  value: string;
  inputChangeHandler: Function;
};
//Style templates
const styles = makeStyles({
  toolbar: {
    backgroundColor: "blue",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    position: "relative",
    minWidth: "64px",
  },
  input: {
    width: "calc(100% - 64px)",

    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      color:"white",
      "& fieldset": {
        borderColor: "white",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        backgroundColor: "rgba(255,255,255,0.3)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  button: {
    height: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    "&:hover": {
      backgroundColor: "white",
    },
  },
  form: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
});

export default function MyToolBar(props: Prop) {

  const isNormalScreen = useMediaQuery("(min-width: 641px)");
  // const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const styleClasses = styles();

  return (
    <React.Fragment>
      <Toolbar
        className={styleClasses.toolbar}
        style={{ height: props.height ? props.height : 64 }}
      >
        {
          //Hidden in small screens
          isNormalScreen && <div className={styleClasses.container}></div>
        }

        <div className={styleClasses.container}>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              props.submitHandler();
            }}
            className={styleClasses.form}
          >
            <TextField autoComplete="off"
              id="search-input"
              label="Search"
              variant="outlined"
              size={"small"}
              className={styleClasses.input}
              value={props.value}
              onChange={(event) => {
                props.inputChangeHandler(event.target.value);
              }}
            />
            <Button
              className={styleClasses.button}
              type="submit"
              aria-label="submit"
            >
              <FaSearch color="blue" />
            </Button>
          </form>
        </div>

        {
          //Hidden in small screens
          isNormalScreen && <div className={styleClasses.container}></div>
        }
      </Toolbar>
    </React.Fragment>
  );
}
