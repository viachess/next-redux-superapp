import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const WaterTemperatureIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase viewBox="0 0 16 16" width={size} height={size} {...rest}>
      <path d="M1.5 5.5q2.5 2.5 4.2-.5m0 0c.5 2 4 2 4.6 0m0 0q1.5 3 4.2.5M1.5 10q2.5 2.5 4.2-.5m0 0c.5 2 4 2 4.6 0m0 0q1.5 3 4.2.5"></path>
    </SvgIconBase>
  );
};
