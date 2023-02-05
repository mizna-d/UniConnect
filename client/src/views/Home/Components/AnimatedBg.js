import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  waves: {
    // position: "sticky",
    width: "100%",
    marginBottom: "-7px",
    height: "20vw",
    minHeight: "10vw",
  },
  "@keyframes moveForever": {
    from: { transform: "translate3d(-90px, 0, 0)" },
    to: { transform: "translate3d(85px, 0, 0)" }
  },
  parallax: {
    "& > use": {
      animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
      animationDelay: props => `-${props.animationNegativeDelay}s`
    }
  }
};

function AnimatedBg(props) {
  const {
    className,
    lowerColor,
    upperColor,
    classes,
    animationNegativeDelay,
    ...rest
  } = props;
  return (
    <div className={className} style={{ background: upperColor }} {...rest}>
      <svg
        className={classes.waves}
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="waves"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={classes.parallax}>
          <use href="#waves" x="10" y="7" fill="rgba(201,217,145,0.7)" />
          <use href="#waves" x="20" y="3" fill="rgba(201,217,145,0.5)" />
          <use href="#waves" x="48" y="5" fill="rgba(201,217,145,0.3)" />
          <use href="#waves" x="48" y="0" fill="rgba(201,217,145,0.3)" />
        </g>
      </svg>
    </div>
  );
}

AnimatedBg.propTypes = {
  lowerColor: PropTypes.string.isRequired,
  upperColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  animationNegativeDelay: PropTypes.number.isRequired
};

export default withStyles(styles)(AnimatedBg);