import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const WaterTemperatureIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase viewBox="0 0 16 16" {...rest} width={size} height={size}>
      <path d="M8 2C6.9 2 6 2.9 6 4v5.1c0 .6-.3 1.2-.8 1.6C4.5 11.2 4 12.1 4 13c0 2 1.8 3 4 3s4-1 4-3c0-.9-.5-1.8-1.2-2.3-.5-.4-.8-1-.8-1.6V4c0-1.1-.9-2-2-2zm0 2c.6 0 1 .4 1 1v5.1c0 1 .5 2 1.3 2.6.4.3.7.8.7 1.3 0 1-1.1 1.5-2 1.5s-2-.5-2-1.5c0-.5.3-1 .7-1.3.8-.6 1.3-1.6 1.3-2.6V5c0-.6.4-1 1-1z" />
    </SvgIconBase>
  );
};
