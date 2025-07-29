import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

export const HumidityIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <SvgIconBase viewBox="0 0 16 16" {...rest} width={size} height={size}>
      <path d="M8 2.5C22 17-6 17 8 2.5m2 6.9q0 1.4-1.4 2" />
    </SvgIconBase>
  );
};
