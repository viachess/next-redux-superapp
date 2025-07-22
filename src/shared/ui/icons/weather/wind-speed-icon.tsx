import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const WindSpeedIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase viewBox="0 0 16 16" width={size} height={size} {...rest}>
      <path d="M7 3.5S9.8 3 9.8 5.4C9.7 7.2 7.4 7 7.4 7H4.8m6.8-1s1.8-.3 1.8 1.2-1.3 1.5-1.3 1.5h-1.3m-3.4 3.8s2 .1 2-1.4c0-1.4-2-1.4-2-1.4H2.6" />
    </SvgIconBase>
  );
};
