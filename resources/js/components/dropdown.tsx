'use client';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface DropdownSidebarProps {
    isOpen: boolean;
    icon: React.ReactNode;
    title: string;
    items: { label: string; href: string }[];
    defaultOpen?: boolean;
}

export default function Dropdown({ isOpen, icon, title, items, defaultOpen = false }: DropdownSidebarProps) {
    const [open, setOpen] = useState(defaultOpen);

    useEffect(() => {
        if (!isOpen) {
            setOpen(false);
        } else {
            setOpen(defaultOpen);
        }
    }, [isOpen, defaultOpen]);

    return (
        <div>
            <button className="flex items-center gap-2 text-sm w-full text-left cursor-pointer hover:bg-gray-100 p-1" onClick={() => setOpen(!open)}>
                <span className="w-4 h-4 ml-4">{icon}</span>

                <p className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{title}</p>

                <ChevronRight className={`ml-auto mr-5 w-4 h-4 transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-screen mt-2 delay-200' : 'max-h-0 '}`}>
                <div className="ml-5 flex flex-col gap-2 text-xs text-gray-700">
                    {items.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className={`ml-1 pl-5 p-1 border-l hover:bg-gray-100 overflow-hidden whitespace-nowrap transition-opacity duration-300 
                                ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
