import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import SettingsLayout from '@/layouts/settings/settings-layout';

export default function Appearance() {
    return (
        <DashboardLayout title='Penampilan'>
            <Head title="Tampilan" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Pengaturan Penampilan" description="Perbarui pengaturan tampilan akun Anda" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </DashboardLayout>
    );
}
