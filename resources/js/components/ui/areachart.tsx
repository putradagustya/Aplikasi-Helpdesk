import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subDays, isWithinInterval, parseISO } from "date-fns";

interface DataItem {
  tanggal: string;
  label: string;
  selesai: number;
  gagal: number;
  instansi: string;
}

interface Props {
  data: DataItem[];
  userInstansi: string;
}

export default function AreaChartComponent({ data, userInstansi }: Props) {
  const today = new Date();
  const tigaHariTerakhir = subDays(today, 3);

  const filteredData = data
    .filter((item) => {
      const tanggal = parseISO(item.tanggal);
      return isWithinInterval(tanggal, { start: tigaHariTerakhir, end: today });
    })
    .filter((item) => {
      if (userInstansi.toLowerCase() === "admin") return true;
      return item.instansi === userInstansi;
    });

  return (
    <>
      <style>{`
        .line-anim {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2s ease forwards;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="border rounded-2xl flex flex-col p-4 w-full text-xs xl:text-sm">
        <div className="mb-5 text-center text-gray-700">
          <h1 className="font-semibold">Statistik Harian</h1>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorBerhasil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorGagal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              minTickGap={15}
              tick={({ x, y, payload, index }) => {
                const totalTicks = filteredData.length;
                const dx = index === 0 ? 5 : index === totalTicks - 1 ? -5 : 0;
                const textAnchor =
                  index === 0
                    ? "start"
                    : index === totalTicks - 1
                    ? "end"
                    : "middle";
                return (
                  <text
                    x={x + dx}
                    y={y + 15}
                    textAnchor={textAnchor}
                    fill="#666"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="selesai"
              stroke="#4ade80"
              fill="url(#colorBerhasil)"
              strokeWidth={2}
              dot={{ r: 3 }}
              className="line-anim"
            />

            <Area
              type="monotone"
              dataKey="gagal"
              stroke="#ef4444"
              fill="url(#colorGagal)"
              strokeWidth={2}
              dot={{ r: 3 }}
              className="line-anim"
              style={{ animationDelay: "0.2s" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
