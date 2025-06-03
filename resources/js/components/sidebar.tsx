'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown';
import { LayoutGrid, HomeIcon, List, Settings, LogOut, Folder, Users2, BarChart2, ChevronRight } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const { auth } = usePage().props as any;
    const [profileOpen, setProfileOpen] = useState(false);

    const menuItem = (href: string, icon: React.ReactNode, label: string) => (
        <a href={href} className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 cursor-pointer">
            <div className="ml-4">{icon}</div>

            <p className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{label}</p>
        </a>
    );

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <div
            className={`flex flex-col sticky top-0 min-h-screen bg-gray-50 transition-all duration-300 
                ${isOpen ? 'w-[250px]' : 'w-0 lg:w-13 delay-200'} 
                ${!isOpen && 'overflow-hidden pointer-events-none opacity-0 lg:opacity-100 lg:pointer-events-auto'}`}
        >
            <div className="flex-1 overflow-y-auto py-5">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1
                            className={`ml-5 text-xs mb-4 text-gray-700 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                        >
                            Navigasi Halaman
                        </h1>
                        <div className="flex flex-col gap-4">
                            {menuItem('/dashboard', <LayoutGrid size={16} />, 'Dashboard')}
                            {menuItem('/', <HomeIcon size={16} />, 'Beranda')}

                            {/* {auth.user.role === 'admin' && (
                                <Dropdown
                                    isOpen={isOpen}
                                    icon={<List size={16} />}
                                    title="Instansi"
                                    items={[
                                        { label: 'LP3', href: '#' },
                                        { label: 'LSP', href: '#' },
                                        { label: 'LB', href: '#' },
                                        { label: 'LPPM', href: '#' },
                                        { label: 'LPM', href: '#' },
                                        { label: 'LPSDM', href: '#' },
                                        { label: 'LKA', href: '#' },
                                        { label: 'LAMKERMA', href: '#' },
                                        { label: 'LAK', href: '#' },
                                        { label: 'LKK', href: '#' },
                                        { label: 'LLD', href: '#' },
                                        { label: 'LPPMB', href: '#' },
                                        { label: 'LPAUD', href: '#' },
                                        { label: 'LPTI', href: '#' },
                                        { label: 'SPPK', href: '#' },
                                        { label: 'UPPS', href: '#' },
                                    ]}
                                    defaultOpen={false}
                                />
                            )} */}
                        </div>
                    </div>

                    <Dropdown
                        isOpen={isOpen}
                        title="Arsip Laporan"
                        icon={<Folder size={16} />}
                        items={[
                            { label: 'Riwayat', href: '#' },
                            { label: 'Tertunda', href: '#' },
                            { label: 'Proses', href: '#' },
                            { label: 'Gagal', href: '#' },
                            { label: 'Selesai', href: '#' },
                        ]}
                        defaultOpen={true}
                    />

                    {auth.user.role === 'admin' && (
                        <Dropdown
                            isOpen={isOpen}
                            title="Kelola Staf"
                            icon={<Users2 size={16} />}
                            items={[
                                { label: 'Semua', href: '#' },
                                { label: 'Tambah', href: '#' },
                                { label: 'Edit', href: '#' },
                                { label: 'Hapus', href: '#' },
                            ]}
                            defaultOpen={true}
                        />
                    )}

                    {menuItem('#', <BarChart2 size={16} />, 'Statistik')}
                </div>
            </div>

            <div className="py-4 bg-gray-50">
                <h1
                    className={`mb-4 ml-5 pt-5 text-xs text-gray-700 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                >
                    Profil Pengguna
                </h1>
                <div className="flex flex-col">
                    <div
                        onClick={() => setProfileOpen(!profileOpen)}
                        className={`rounded-2xl flex items-center justify-between m-2 py-2 px-2 cursor-pointer hover:bg-gray-100 
                        ${isOpen ? 'border' : 'border-none'}`}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold shrink-0">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <h1
                                    className={`text-sm font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {auth.user.name}
                                </h1>
                                <span
                                    className={`text-xs text-gray-500 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    @{auth.user.username}
                                </span>
                            </div>
                        </div>
                        {isOpen && (
                            <ChevronRight
                                className={`w-4 h-4 transition-transform duration-300 ${profileOpen ? 'rotate-90' : 'rotate-0'}`}
                            />
                        )}
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${profileOpen && isOpen ? 'max-h-40 mt-2 delay-200' : 'max-h-0'}`}
                    >
                        <div className="flex flex-col gap-4 ml-4">
                            <a
                                href="/settings"
                                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded cursor-pointer"
                            >
                                <Settings size={16} />
                                <span>Pengaturan</span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded cursor-pointer"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
