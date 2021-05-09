import React from "react";

export default function Loader(props) {
  if (props.loading) {
    return <h3 style={{textAlign:"center", color: "white"}}>Loading...</h3>;

  }
  return null;
}
