import React from "react";
import CustomToolBar from "../components/myToolbar";

type Prop = {
  toolBarHeight?: number;
};
export default function Library(props: Prop) {
  return (
    <React.Fragment>
      <CustomToolBar
        submitHandler={(string: any) => {
          console.log(string);
        }}
        height={props.toolBarHeight ? props.toolBarHeight : undefined}
      />
      pagina biblioteca
    </React.Fragment>
  );
}
