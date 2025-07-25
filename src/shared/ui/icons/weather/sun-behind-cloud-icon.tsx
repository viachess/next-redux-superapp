import { FC } from "react";
import { SvgIconBase } from "../svg-icon-base";
import { IconProps } from "../types";
import { DEFAULT_ICON_SIZE } from "../constants";

const SUN_COLOR = "#FFAC33";
const CLOUD_COLOR = "#E1E8ED";

export const SunBehindCloudIcon: FC<IconProps> = ({
  size = DEFAULT_ICON_SIZE,
}) => {
  return (
    <SvgIconBase viewBox="0 0 36 36" width={size} height={size}>
      <path
        fill={SUN_COLOR}
        d="M13 6s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V6zM4 17s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm3.872-6.957s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.415-1.414s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.415zm17.085 2.828s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414z"
      />
      <circle fill={SUN_COLOR} cx="15" cy="19" r="8" />
      <path
        fill={CLOUD_COLOR}
        d="M28.223 16.8c-.803 0-1.575.119-2.304.34c-.862-2.409-3.201-4.14-5.961-4.14c-2.959 0-5.437 1.991-6.123 4.675a4.399 4.399 0 0 0-2.626-.875c-2.417 0-4.375 1.914-4.375 4.275c0 .573.12 1.118.329 1.618a4.949 4.949 0 0 0-1.302-.193C3.176 22.5 1 24.626 1 27.25S3.176 32 5.861 32h22.361C32.518 32 36 28.598 36 24.4s-3.482-7.6-7.777-7.6z"
      />
    </SvgIconBase>
  );
};
