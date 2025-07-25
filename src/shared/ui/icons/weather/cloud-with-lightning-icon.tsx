import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

const CLOUD_FILL = "#E1E8ED";
const LIGHTNING_FILL = "#F4900C";

export const CloudWithLightningIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
}) => {
  return (
    <SvgIconBase viewBox="0 0 36 36" width={size} height={size}>
      <path
        fill={LIGHTNING_FILL}
        d="M13.917 36a.417.417 0 0 1-.371-.607L17 29h-5.078c-.174 0-.438-.031-.562-.297c-.114-.243-.057-.474.047-.703L15 19c.078-.067 6.902.393 7 .393a.417.417 0 0 1 .369.608l-3.817 6h5.032c.174 0 .329.108.391.271a.418.418 0 0 1-.119.461l-9.666 9.166a.422.422 0 0 1-.273.101z"
      ></path>
      <path
        fill={CLOUD_FILL}
        d="M28 4c-.825 0-1.62.125-2.369.357A6.498 6.498 0 0 0 19.5 0c-3.044 0-5.592 2.096-6.299 4.921A4.459 4.459 0 0 0 10.5 4A4.5 4.5 0 0 0 6 8.5c0 .604.123 1.178.339 1.704A4.98 4.98 0 0 0 5 10c-2.762 0-5 2.238-5 5s2.238 5 5 5h23a8 8 0 1 0 0-16z"
      ></path>
    </SvgIconBase>
  );
};
