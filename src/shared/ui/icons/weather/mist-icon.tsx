import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const MistIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="black"
      {...rest}
    >
      <g>
        <g>
          <rect y="304.899" width="477.483" height="34.517" />
        </g>
      </g>
      <g>
        <g>
          <rect y="419.955" width="477.483" height="34.517" />
        </g>
      </g>
      <g>
        <g>
          <rect x="34.517" y="362.427" width="477.483" height="34.517" />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M391.191,207.101c0-82.607-66.966-149.573-149.573-149.573S92.045,124.494,92.045,207.101
			c-41.303,0-74.786,33.484-74.786,74.786h448.719C465.978,240.585,432.494,207.101,391.191,207.101z"
          />
        </g>
      </g>
    </SvgIconBase>
  );
};
