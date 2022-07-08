import React from "react";

import classes from "./LoadingSpinner.module.scss";

interface IProps {
  asOverlay: Boolean;
}

const LoadingSpinner: React.FunctionComponent<IProps> = (props) => {
  return (
    <section
      className={`${props.asOverlay && classes.loadingSpinner__overlay}`}
    >
      <div className={classes.ldsDualRing}></div>
    </section>
  );
};

export default LoadingSpinner;
