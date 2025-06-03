import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
  instansi?: string;
}

interface Props {
  data: DataItem[];
  userInstansi: string;
}

const COLORS: Record<string, string> = {
  Selesai: "#4ade80",
  Gagal: "#ef4444",
};

function getColor(status: string): string {
  return COLORS[status] || "#ccc";
}

export default function PieChartComponent({ data, userInstansi }: Props) {
  const filteredData =
    userInstansi.toLowerCase() === "admin"
      ? data
      : data.filter((item) => item.instansi === userInstansi);

  // Kelompokkan agar hanya ada 1 per status
  const statusList = ["Gagal", "Selesai"];
  const chartData = statusList.map((status) => {
    const item = filteredData.find((d) => d.name === status);
    return {
      name: status,
      value: item ? item.value : 0,
    };
  });

  return (
    <div className="xl:border rounded-2xl flex flex-col p-4 w-full text-xs xl:text-sm">
      <h1 className="mb-5 font-semibold text-center text-gray-700">
        Status Laporan
      </h1>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
            labelLine={false}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={getColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
