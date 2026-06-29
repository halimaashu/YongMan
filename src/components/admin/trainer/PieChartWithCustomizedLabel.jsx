"use client";

import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";



const COLORS = ["#7F00FF", "#ff0000", ];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent || 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();

  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];

  const fillOpacity =
    isAnyPieActive && !isThisPieActive ? 0.5 : 1;

  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: "fill-opacity 0.3s ease" }}
    />
  );
};

export default function PieChartWithCustomizedLabel({
totalStudents,totalClasses,
  isAnimationActive = true,
})





{
    const data = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Shalled",
      value: totalClasses,
    },
  ];

  return (
  <div className="h-[400px] w-full">
    <ResponsiveContainer width="100%" height="100%">
         <PieChart
      width={400}
      height={400}
    >
      <Pie
        data={data}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
      <RechartsDevtools />
    </PieChart>

    </ResponsiveContainer>
     
  </div>
  );
}