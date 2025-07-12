import { FC, SVGProps, ReactNode } from "react";

interface SvgIconBaseProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
}

export const SvgIconBase: FC<SvgIconBaseProps> = ({ children, ...props }) => (
  <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
    {children}
  </svg>
);
