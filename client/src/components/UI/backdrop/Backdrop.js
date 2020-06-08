import React from "react";

import "./Backdrop.css";

const Backdrop = (props) => (
  <div className="background">
    <div className="modal " style={{ width: props.width }}>
      {props.children}
    </div>
  </div>
);

export default Backdrop;
