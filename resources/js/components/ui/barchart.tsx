import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  location: string;
  total: number;
  instansi: string;
}

interface Props {
  data: DataItem[];
  userInstansi: string;
}

export default function BarChartComponent({ data, userInstansi }: Props) {
  // Filter data berdasarkan instansi user jika bukan admin
  const filteredData =
    userInstansi.toLowerCase() === "admin"
      ? data
      : data.filter((item) => item.instansi === userInstansi);

  return (
    <div className="border rounded-2xl p-4 w-full text-xs xl:text-sm">
      <h1 className="mb-5 text-center text-gray-700 font-semibold">Statistik Lokasi</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="location" tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
