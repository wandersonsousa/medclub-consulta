import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function MenosIconSVG(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      width={512}
      height={512}
      enableBackground="new 0 0 512 512"
      {...props}
    >
      <Path d="M480 288H32c-17.673 0-32-14.327-32-32s14.327-32 32-32h448c17.673 0 32 14.327 32 32s-14.327 32-32 32z" />
    </Svg>
  );
}

