import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const AtmospherePressureIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase viewBox="0 0 16 16" width={size} height={size} {...rest}>
      <path d="M.5 8a7.5 7.5 0 1 1 0 .001zm6.5 0a1 1 0 1 1 0 .001zm-1 2l5.8-5.8m-2.5 0h2.5v2.5"></path>
    </SvgIconBase>
  );
};
