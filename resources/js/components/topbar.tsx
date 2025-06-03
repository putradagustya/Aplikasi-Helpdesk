import { PanelLeft } from "lucide-react";

export default function Topbar({ onToggleSidebar, title }: { onToggleSidebar: () => void; title: string }) {
    return (
        <div className="rounded-t-2xl flex p-5 bg-white shadow z-100">
            <div className="flex items-center gap-3 text-sm">
                <div className="rounded-lg -m-2 p-2 cursor-pointer hover:bg-gray-100" onClick={onToggleSidebar}>
                    <PanelLeft className="w-4 h-4" />
                </div>
                <div><h1>{title}</h1></div>
            </div>
        </div>
    );
}
