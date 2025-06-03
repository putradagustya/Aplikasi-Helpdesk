import StatistikPage from "@/components/statistik";
import Table from "@/components/table";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return  (
        <>
            <Head>
                <title>Dashboard</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"/>
            </Head>
            
            <div className="font-['Open_Sans']">
                <DashboardLayout title="Dashboard">
                    <div className="flex flex-col">
                        <StatistikPage />

                        <Table />
                    </div>
                </DashboardLayout>
            </div>
        </>
    );
}