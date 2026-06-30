"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function AdminDashboardChart({
  users,
  classes,
  bookings,
}) {
  const data = [
    { name: "Users", value: users, color: "#3b82f6" },
    { name: "Classes", value: classes, color: "#22c55e" },
    { name: "Bookings", value: bookings, color: "#f59e0b" },
  ];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={4}
            cornerRadius={8}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={item.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}