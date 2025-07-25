import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

const topCloudFill = "#CCD6DD";
const bottomCloudFill = "#E1E8ED";

export const CloudIcon: FC<IconProps> = ({ size = DEFAULT_ICON_SIZE }) => {
  return (
    <SvgIconBase viewBox="0 0 36 36" width={size} height={size}>
      <path
        fill={topCloudFill}
        d="M27 8a6.98 6.98 0 0 0-2.015.298c.005-.1.015-.197.015-.298a5.998 5.998 0 0 0-11.785-1.573A5.974 5.974 0 0 0 11 6a6 6 0 1 0 0 12a5.998 5.998 0 0 0 5.785-4.428A5.975 5.975 0 0 0 19 14c.375 0 .74-.039 1.096-.104c-.058.36-.096.727-.096 1.104c0 3.865 3.135 7 7 7s7-3.135 7-7a7 7 0 0 0-7-7z"
      ></path>
      <path
        fill={bottomCloudFill}
        d="M31 22c-.467 0-.91.085-1.339.204c.216-.526.339-1.1.339-1.704a4.5 4.5 0 0 0-4.5-4.5a4.459 4.459 0 0 0-2.701.921A6.497 6.497 0 0 0 16.5 12a6.497 6.497 0 0 0-6.131 4.357A8 8 0 1 0 8 32h23c2.762 0 5-2.238 5-5s-2.238-5-5-5z"
      ></path>
    </SvgIconBase>
  );
};
