import React, { useEffect, useState, useCallback, useRef } from "react";
import { CheckCircle2, XCircle, MoreVertical, AlertCircle, Loader2 } from "lucide-react";
import { router, Link } from "@inertiajs/react";

export type StatusType = "Selesai" | "Proses" | "Gagal" | "Verifikasi";

export type RowData = {
  id: number;
  kode: string;
  name: string;
  location: string;
  ruang: string;
  instansi: string;
  tanggal: string;
  status: StatusType;
};

async function fetchData(
  page: number,
  limit: number,
  search: string
): Promise<{ data: RowData[]; total: number }> {
  const res = await fetch(
    `/reports?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );
  if (!res.ok) throw new Error("Gagal fetch data");
  return await res.json();
}

const StatusIcon = React.memo(({ status }: { status: StatusType }) => {
  const icons = {
    Verifikasi: <AlertCircle className="w-4 h-4 text-blue-600" />,
    Proses: <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />,
    Gagal: <XCircle className="w-4 h-4 text-red-600" />,
    Selesai: <CheckCircle2 className="w-4 h-4 text-green-600" />,
  };
  return icons[status] || null;
});

type RowProps = {
  row: RowData;
  activeDropdown: { id: number | null; type: "status" | "detail" | null };
  setActiveDropdown: (value: { id: number | null; type: "status" | "detail" | null }) => void;
  refreshData: () => void;
};

const Row = React.memo(({ row, activeDropdown, setActiveDropdown, refreshData }: RowProps) => {
  const statusRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const isStatusOpen = activeDropdown.id === row.id && activeDropdown.type === "status";
  const isDetailOpen = activeDropdown.id === row.id && activeDropdown.type === "detail";

  const toggleDropdown = (type: "status" | "detail") => {
    setActiveDropdown(
      activeDropdown.id === row.id && activeDropdown.type === type
        ? { id: null, type: null }
        : { id: row.id, type }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (isStatusOpen && statusRef.current && !statusRef.current.contains(target)) ||
        (isDetailOpen && detailRef.current && !detailRef.current.contains(target))
      ) {
        setActiveDropdown({ id: null, type: null });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStatusOpen, isDetailOpen, setActiveDropdown]);

  function updateStatus(id: number, status: StatusType) {
    router.post(
      "/report.update",
      { id, status },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          alert("Status berhasil diperbarui!");
          refreshData();
        },
        onError: (errors) => {
          alert(errors.status || "Status gagal diperbarui");
        },
      }
    );
  }

  return (
    <tr className="hover:bg-gray-50 relative">
      <td className="border p-3 w-[80px]">{row.kode}</td>
      <td className="border p-3 w-[200px]">{row.name}</td>
      <td className="border p-3 w-[200px]">{row.location}</td>
      <td className="border p-3 w-[80px] text-center">{row.ruang || "-"}</td>
      <td className="border p-3 w-[450px]">{row.instansi}</td>
      <td className="border p-3 w-[120px] text-center">{row.tanggal}</td>
      <td className="border p-3 w-[100px] relative">
        <div className="flex items-center justify-between m-auto">
          <div
            className="border rounded py-1 px-2 gap-1 flex w-25 items-center text-xs cursor-pointer select-none"
            onClick={() => toggleDropdown("status")}
            tabIndex={0}
            role="button"
          >
            <StatusIcon status={row.status} />
            {row.status}
          </div>

          <div
            className="rounded px-2 py-1 text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer select-none"
            onClick={() => toggleDropdown("detail")}
            tabIndex={0}
            role="button"
          >
            <MoreVertical className="w-4 h-4" />
          </div>
        </div>

        {isStatusOpen && (
          <div
            ref={statusRef}
            className="border absolute top-full right-30 mt-1 bg-white shadow-md text-sm z-20 min-w-[150px]"
          >
            {(["Proses", "Selesai", "Gagal"] as StatusType[]).map((st) => (
              <div
                key={st}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer select-none"
                onClick={() => updateStatus(row.id, st)}
              >
                {st}
              </div>
            ))}
          </div>
        )}

        {isDetailOpen && (
          <div
            ref={detailRef}
            className="border absolute top-full right-0 mt-1 bg-white shadow-md text-sm z-20 min-w-[150px]"
          >
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer select-none">
              <Link
  href={`/report/detail/${row.id}`}
  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer select-none"
>
  Lihat Detail
</Link>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
});

export default function Table() {
  const [data, setData] = useState<RowData[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<{
    id: number | null;
    type: "status" | "detail" | null;
  }>({ id: null, type: null });

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: fetchedData, total } = await fetchData(page, itemsPerPage, searchTerm);
      setData(fetchedData);
      setTotalData(total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    loadData();
  }, [page, searchTerm, loadData]);

  const totalPages = Math.ceil(totalData / itemsPerPage) || 1;

  const onSearchClick = () => {
    setSearchTerm(searchInput.trim());
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div className="border rounded-2xl m-6 p-6 overflow-x-auto text-sm whitespace-nowrap relative">
      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Cari data"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="px-3 py-2 border text-sm w-60"
          autoComplete="off"
          disabled={loading}
        />

        <button
          onClick={onSearchClick}
          disabled={loading}
          className="px-4 py-2 bg-gray-200 font-semibold disabled:opacity-50 cursor-pointer"
        >
          Search
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Kode Laporan</th>
            <th className="border p-3">Nama</th>
            <th className="border p-3">Kampus</th>
            <th className="border p-3">Ruang</th>
            <th className="border p-3">Instansi</th>
            <th className="border p-3">Tanggal</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-6">
                Memuat Data
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6">
                Data tidak ditemukan
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <Row
                key={row.id}
                row={row}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                refreshData={loadData}
              />
            ))
          )}
        </tbody>
      </table>

      {totalData > 0 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border disabled:opacity-50 cursor-pointer"
          >
            Sebelumnya
          </button>

          <span className="px-3 py-1 select-none">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border disabled:opacity-50 cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
