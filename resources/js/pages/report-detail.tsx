import { usePage, router } from '@inertiajs/react';

type Report = {
  id: number;
  kode_laporan: string;
  nama: string;
  username: string;
  instansi: string;
  location: string;
  ruang: string;
  status: string;
  deskripsi: string;
  tanggal: string;
  lampiran: string[] | null;
};

export default function ReportDetail() {
  const { report } = usePage().props as unknown as { report: Report };

  if (!report) return <div className="p-6 text-center text-gray-500">Data tidak ditemukan</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3 md:mb-0">Detail Laporan</h1>
        <button
          onClick={() => router.visit('/dashboard')}
          className="text-sm px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Kembali
        </button>
      </div>

      {/* Info Detail */}
      <div className="space-y-4 text-gray-800 text-base leading-relaxed">
        <div><strong>Kode:</strong> {report.kode_laporan}</div>
        <div><strong>Nama:</strong> {report.nama}</div>
        <div><strong>Username:</strong> {report.username}</div>
        <div><strong>Instansi:</strong> {report.instansi}</div>
        <div><strong>Lokasi:</strong> {report.location}</div>
        <div><strong>Ruang:</strong> {report.ruang}</div>
        <div><strong>Status:</strong> {report.status}</div>
        <div><strong>Tanggal:</strong> {report.tanggal}</div>
      </div>

      {/* Deskripsi */}
      <section>
        <p className="font-semibold text-gray-900 mb-2">Deskripsi:</p>
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{report.deskripsi}</p>
      </section>

      {/* Lampiran */}
      <section>
        <p className="font-semibold text-gray-900 mb-3">Lampiran:</p>
        {report.lampiran && report.lampiran.length > 0 ? (
          <ul className="space-y-3">
            {report.lampiran.map((path, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 rounded-md px-5 py-3"
              >
                <span className="text-gray-800 font-medium">Lampiran {i + 1}</span>
                <a
                  href={`/storage/${path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-sm bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500 text-lg">-</span>
        )}
      </section>
    </div>
  );
}
