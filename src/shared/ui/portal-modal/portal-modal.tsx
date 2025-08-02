"use client";

import { FC, useEffect, ReactNode, PureComponent } from "react";
import { createPortal } from "react-dom";

import { PortalTypeEnum } from "./types";
import { hexToRgbA } from "@/shared/utils";
import { MODAL_ZINDEX } from "@/app/store";

interface PortalProps {
  bgColor?: string;
  opacity?: number;
  padding?: string;
  zIndex?: number;
  type?: PortalTypeEnum;
  isFullScreen?: boolean;
  children: ReactNode;
}

export const PortalFC: FC<PortalProps> = ({
  bgColor = null,
  opacity = null,
  padding = null,
  zIndex = null,
  type = PortalTypeEnum.MODAL,
  children,
}) => {
  const modalRoot = document.getElementById("modal-root");
  const contextRoot = document.getElementById("context-root");
  const root = document.getElementById("root")!;

  const htmlNode: HTMLDivElement = document.createElement("div");

  const rootPortalElement =
    type === PortalTypeEnum.MODAL ? modalRoot : contextRoot;
  rootPortalElement?.appendChild(htmlNode);

  useEffect(() => {
    if (type === PortalTypeEnum.MODAL) {
      const oldCss = htmlNode.style.cssText;
      htmlNode.style.cssText = `${oldCss} background-color: ${
        bgColor === null
          ? "rgba(255,255,255, 0)"
          : hexToRgbA(bgColor, opacity === null ? 1 : opacity)
      }; padding: ${padding === null ? "0" : padding}; z-index: ${
        zIndex === null ? MODAL_ZINDEX : zIndex
      };`;
      root.style.overflow = "hidden";
    }
    if (type === PortalTypeEnum.CONTEXT) {
      htmlNode.style.cssText = `position: relative; overflow-y: auto; width: 100%; height: 100%; margin: 0 !important; top: 0px; left: 0px; z-index: ${
        zIndex === null ? MODAL_ZINDEX : zIndex
      };`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootPortalElement]);

  useEffect(() => {
    return () => {
      rootPortalElement?.removeChild(htmlNode);
      root.style.overflow = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(children, htmlNode);
};

export class Portal extends PureComponent<PortalProps> {
  modalRoot = document.getElementById("modal-root");
  contextRoot = document.getElementById("context-root");
  root = document.getElementById("root")!;
  htmlNode: HTMLDivElement;
  rootPortalElement: HTMLDivElement | null = null;

  constructor(props: PortalProps) {
    super(props);
    this.htmlNode = document.createElement("div");
    this.htmlNode.style.cssText =
      "position: fixed; overflow-y: auto; width: 100%; height: 100%; margin: 0 !important; top: 0px; left: 0px";
  }

  componentDidMount() {
    const {
      bgColor = null,
      opacity = null,
      padding = null,
      zIndex = null,
      type = PortalTypeEnum.MODAL,
    } = this.props;
    this.rootPortalElement = (
      type === PortalTypeEnum.MODAL ? this.modalRoot : this.contextRoot
    ) as HTMLDivElement;
    this.rootPortalElement?.appendChild(this.htmlNode);

    if (type === PortalTypeEnum.MODAL) {
      const oldCss = this.htmlNode.style.cssText;

      this.htmlNode.style.cssText = `${oldCss} background-color: ${
        bgColor === null
          ? "rgba(255,255,255, 0)"
          : hexToRgbA(bgColor, opacity === null ? 1 : opacity)
      }; padding: ${padding === null ? "0" : padding}; z-index: ${
        zIndex === null ? MODAL_ZINDEX : zIndex
      }; pointer-events: ${this.props.isFullScreen ? "all" : "none"};`;
      this.htmlNode.classList.add("modal-container");
      if (this.props.isFullScreen) {
        this.root.style.overflow = "hidden";
      }
    }
    if (type === PortalTypeEnum.CONTEXT) {
      this.htmlNode.style.cssText = `position: fixed; overflow-y: auto; width: 100%; height: 100%; margin: 0 !important; top: 0px; left: 0px; z-index: ${
        zIndex === null ? MODAL_ZINDEX : zIndex
      };`;
      this.htmlNode.classList.add("context-container");
    }
  }

  componentWillUnmount() {
    this.rootPortalElement?.removeChild(this.htmlNode);
    this.root.style.overflow = "auto";
  }

  render() {
    return createPortal(this.props.children, this.htmlNode);
  }
}
