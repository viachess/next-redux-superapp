import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

const COMPASS_ARROW_FILL = "#000000";

export const CompassArrowIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  fill = COMPASS_ARROW_FILL,
  ...rest
}) => {
  return (
    <SvgIconBase
      {...rest}
      viewBox="0 0 512 512"
      width={size}
      height={size}
      transform="rotate(45)"
    >
      <g>
        <path
          fill={fill}
          d="M476.811,492.379L268.639,8.332c-2.172-5.047-7.141-8.328-12.641-8.328s-10.469,3.281-12.641,8.328
		L35.186,492.379c-2.656,5.625-1.203,12.344,3.547,16.359c4.766,4.016,11.625,4.359,16.734,0.813l200.531-139.032l200.547,139.032
		c5.109,3.547,11.969,3.203,16.734-0.813C478.029,504.723,479.467,498.004,476.811,492.379z"
        />
      </g>
    </SvgIconBase>
  );
};
