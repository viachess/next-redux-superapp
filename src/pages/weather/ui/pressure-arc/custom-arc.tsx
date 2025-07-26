"use client";

import { Arc as ArcType } from "d3-shape";

export const CustomArc = ({
  path,
  color,
}: {
  path: ArcType<any, unknown>;
  color: string;
}) => {
  return (
    <>
      {/*  */}
      <path d={(path as any)()} fill={color} />
      <text
        fill="white"
        x={path.centroid(path)[0]}
        y={path.centroid(path)[1]}
        dy=".33em"
        fontSize={8}
        textAnchor="middle"
        pointerEvents="none"
      >
        {color}
      </text>
    </>
  );
};
