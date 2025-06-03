import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import AreaChartComponent from "./ui/areachart";
import BarChartComponent from "./ui/barchart";
import PieChartComponent from "./ui/piechart";
import axios from "axios";

type User = {
  instansi: string;
};

export default function StatistikPage() {
  const { props } = usePage<{ auth: { user: User } }>();
  const user = props.auth.user;

  const [areaData, setAreaData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    axios.get("/statistik").then((res) => {
      const mappedBar = res.data.bar
        .map((item: any) => {
          let location = item.location;
          if (location === "Kampus 1 : Pusat") location = "Kampus 1";
          else if (location === "Kampus 2 : Viktor") location = "Kampus 2";
          else if (location === "Kampus 3 : Witana Harja") location = "Kampus 3";
          else if (location === "Kampus 4 : Serang") location = "Kampus 4";
          return { ...item, location };
        })
        .sort((a: any, b: any) => {
          const order = ["Kampus 1", "Kampus 2", "Kampus 3", "Kampus 4"];
          return order.indexOf(a.location) - order.indexOf(b.location);
        });

      setAreaData(res.data.area);
      setBarData(mappedBar);
      setPieData(res.data.pie);
    });
  }, []);

  return (
    <div className="border-none xl:border rounded xl:m-6 flex flex-col lg:flex-row gap-6 justify-center items-stretch">
      <div className="w-full lg:w-1/3">
        <AreaChartComponent data={areaData} userInstansi={user.instansi} />
      </div>
      <div className="w-full lg:w-1/3">
        <BarChartComponent data={barData} userInstansi={user.instansi} />
      </div>
      <div className="w-full lg:w-1/3">
        <PieChartComponent data={pieData} userInstansi={user.instansi} />
      </div>
    </div>
  );
}
