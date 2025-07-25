import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

const SUN_COLOR = "#FFAC33";
const CLOUD_COLOR = "#E1E8ED";

export const SunBehindSmallCloudIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
}) => {
  return (
    <SvgIconBase viewBox="0 0 36 36" width={size} height={size}>
      <path
        fill={SUN_COLOR}
        d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm20.587 2.828s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414z"
      />
      <circle fill={SUN_COLOR} cx="18" cy="18" r="10" />
      <path
        fill={CLOUD_COLOR}
        d="M29.777 23.2c-.642 0-1.26.1-1.843.285c-.688-2.028-2.56-3.485-4.767-3.485c-2.368 0-4.35 1.678-4.899 3.937a3.407 3.407 0 0 0-2.101-.736c-1.933 0-3.5 1.611-3.5 3.6c0 .483.096.941.264 1.363A3.715 3.715 0 0 0 11.889 28C9.741 28 8 29.791 8 32s1.741 4 3.889 4h17.889C33.214 36 36 33.136 36 29.6c0-3.535-2.786-6.4-6.223-6.4z"
      />
    </SvgIconBase>
  );
};
