"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { Portal } from "./portal-modal";
import { PortalTypeEnum } from "./types";
import {
  closeModal,
  selectOpenedModal,
  useAppDispatch,
  useAppSelector,
} from "@/app/store";

interface ModalContainerProps {
  bgColor?: string;
  opacity?: number;
  padding?: string;
  type?: PortalTypeEnum;
  zIndex?: number;
  isFullScreen?: boolean;
  children: ReactNode;
  name?: string;
}

export const ModalContainer: FC<ModalContainerProps> = (props) => {
  const {
    children,
    bgColor,
    opacity,
    padding,
    zIndex,
    type = PortalTypeEnum.MODAL,
    name,
    isFullScreen = true,
  } = props;

  const openedModal = useAppSelector(selectOpenedModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (type === PortalTypeEnum.MODAL && name) {
        dispatch(closeModal());
      }
    };
  }, [type, name, dispatch]);
  if (type === PortalTypeEnum.MODAL) {
    return name === openedModal ? (
      <Portal
        bgColor={bgColor}
        padding={padding}
        opacity={opacity}
        zIndex={zIndex}
        isFullScreen={isFullScreen}
      >
        {children}
      </Portal>
    ) : null;
  }
  // context menu mode
  return (
    <Portal type={PortalTypeEnum.CONTEXT} zIndex={zIndex ?? 0}>
      {children}
    </Portal>
  );
};
