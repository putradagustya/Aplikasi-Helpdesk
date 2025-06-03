import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

interface Option { value: string; label: string; }

interface LaporanRingkas {
  kode_laporan: string;
  status: string;
  tanggal: string;
  instansi: string;
}

interface LaporanDetail extends LaporanRingkas {
  nama: string;
  username?: string;
  location?: string;
  ruang?: string;
  deskripsi: string;
}

export default function StatusLaporan() {
  const [kode, setKode] = useState('');
  const [instansi, setInstansi] = useState<Option | null>({ value: 'all', label: 'Semua Instansi' });
  const [nama, setNama] = useState('');
  const [hasilKode, setHasilKode] = useState<LaporanDetail | null>(null);
  const [riwayat, setRiwayat] = useState<LaporanRingkas[]>([]);
  const [detailTerpilih, setDetailTerpilih] = useState<LaporanDetail | null>(null);
  const [loadingKode, setLoadingKode] = useState(false);
  const [loadingNama, setLoadingNama] = useState(false);
  const [errorKode, setErrorKode] = useState('');
  const [errorNama, setErrorNama] = useState('');

  const instansiOptions: Option[] = [
    { value: 'all', label: 'Semua Instansi' },
    { value: 'LP3 : Lembaga Pengembangan Pendidikan dan Pembelajaran', label: 'LP3 : Lembaga Pengembangan Pendidikan dan Pembelajaran' },
    { value: 'LSP : Lembaga Sertifikasi Profesi', label: 'LSP : Lembaga Sertifikasi Profesi' },
    { value: 'LB : Lembaga Bahasa', label: 'LB : Lembaga Bahasa' },
    { value: 'LPPM : Lembaga Penelitian dan Pengabdian Kepada Masyarakat', label: 'LPPM : Lembaga Penelitian dan Pengabdian Kepada Masyarakat' },
    { value: 'LPM : Lembaga Penjaminan Mutu', label: 'LPM : Lembaga Penjaminan Mutu' },
    { value: 'LPSDM : Lembaga Pengembangan Sumber Daya Manusia', label: 'LPSDM : Lembaga Pengembangan Sumber Daya Manusia' },
    { value: 'LKA : Lembaga Kemahasiswaan dan Alumni', label: 'LKA : Lembaga Kemahasiswaan dan Alumni' },
    { value: 'LAMKERMA : Lembaga Kemitraan dan Kerjasama', label: 'LAMKERMA : Lembaga Kemitraan dan Kerjasama' },
    { value: 'LAK : Lembaga Administrasi Keuangan', label: 'LAK : Lembaga Administrasi Keuangan' },
    { value: 'LKK : Lembaga Kajian Keagamaan', label: 'LKK : Lembaga Kajian Keagamaan' },
    { value: 'LLD : Lembaga Layanan Disabilitas', label: 'LLD : Lembaga Layanan Disabilitas' },
    { value: 'LPPMB : Lembaga Pemasaran dan Penerimaan Mahasiswa Baru', label: 'LPPMB : Lembaga Pemasaran dan Penerimaan Mahasiswa Baru' },
    { value: 'LPAUD : Lembaga Pengelolaan Aset dan Urusan Dalam', label: 'LPAUD : Lembaga Pengelolaan Aset dan Urusan Dalam' },
    { value: 'LPTI : Lembaga Pengembangan Teknologi Informasi', label: 'LPTI : Lembaga Pengembangan Teknologi Informasi' },
    { value: 'SPPK : Satgas Pencegahan dan Penanganan Kekerasan', label: 'SPPK : Satgas Pencegahan dan Penanganan Kekerasan' },
    { value: 'UPPS : Unit Pengelola Program Studi', label: 'UPPS : Unit Pengelola Program Studi' },
  ];

  const handleSubmitKode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingKode(true);
    setErrorKode('');
    setHasilKode(null);

    try {
      const response = await axios.post('/report.search', { kode_laporan: kode.trim() });
      setHasilKode(response.data);
    } catch (err: any) {
      setErrorKode(err.response?.data?.message || 'Error pencarian kode laporan');
    } finally {
      setLoadingKode(false);
    }
  };

  const handleSubmitNamaInstansi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingNama(true);
    setErrorNama('');
    setPage(1);
    fetchRiwayat(1);
    setDetailTerpilih(null);

    if (!nama.trim() || !instansi) {
      setErrorNama('Nama dan Instansi wajib diisi.');
      setLoadingNama(false);
      return;
    }

    try {
      const response = await axios.post('/report.search', {
        name: nama.trim(),
        instansi: instansi.value,
      });

      const data = response.data;

      const riwayatData: LaporanRingkas[] = data.map((r: LaporanDetail) => ({
        kode_laporan: r.kode_laporan,
        status: r.status,
        tanggal: r.tanggal,
        instansi: r.instansi,
      }));

      setRiwayat(riwayatData);
    } 
     finally {
      setLoadingNama(false);
    }
  };

  const fetchRiwayat = async (pageToFetch: number) => {
    setLoadingNama(true);
    setErrorNama('');
    setRiwayat([]);
    setDetailTerpilih(null);

    if (!nama.trim() || !instansi) {
      setErrorNama('Nama dan Instansi wajib diisi.');
      setLoadingNama(false);
      return;
    }

    try {
      const response = await axios.post(`/report.search?page=${pageToFetch}`, {
        name: nama.trim(),
        instansi: instansi.value,
      });

      const data = response.data;

      const riwayatData: LaporanRingkas[] = data.data.map((r: LaporanDetail) => ({
        kode_laporan: r.kode_laporan,
        status: r.status,
        tanggal: r.tanggal,
        instansi: r.instansi,
      }));

      setRiwayat(riwayatData);
      setPage(data.current_page);
      setTotalPages(data.last_page);
    } catch (err: any) {
      setErrorNama(err.response?.data?.message || 'Laporan tidak ditemukan');
    } finally {
      setLoadingNama(false);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchRiwayat(newPage);
    }
  };

  const fetchDetailByKode = async (kode_laporan: string) => {
    setLoadingNama(true);
    setErrorNama('');
    setDetailTerpilih(null);

    try {
      const response = await axios.post('/report.search', { kode_laporan });
      setDetailTerpilih(response.data);
    } catch (err: any) {
      setErrorNama(err.response?.data?.message || 'Gagal mengambil detail laporan');
    } finally {
      setLoadingNama(false);
    }
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg space-y-10 text-sm font-sans">
      <h1 className="bg-[#c70039] text-white text-xl font-bold text-center py-3 rounded uppercase select-none">
        Status Laporan
      </h1>

      <section>
        <form onSubmit={handleSubmitKode} className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={kode}
              onChange={e => setKode(e.target.value)}
              required
              placeholder="Masukkan Kode Laporan"
              className="border border-gray-300 rounded p-3 w-full outline-[#c70039] hover:border-[#c70039]"
            />
            <button
              type="submit"
              disabled={loadingKode}
              className="bg-[#c70039] text-white font-bold w-40 py-2 rounded hover:bg-[#a00030] transition-colors duration-200"
            >
              {loadingKode ? 'Memeriksa...' : 'Lihat Status'}
            </button>
          </div>
          {errorKode && <p className="text-red-600 text-sm mt-1">{errorKode}</p>}
        </form>
      </section>

      {!hasilKode && (
        <section className="border-t pt-6">
          <h2 className="font-semibold mb-4 select-none">Lupa Kode Laporan?</h2>
          <form onSubmit={handleSubmitNamaInstansi} className="space-y-6">
            <input
              type="text"
              placeholder="Nama Lengkap *"
              value={nama}
              onChange={e => setNama(e.target.value)}
              required
              className="border border-gray-300 rounded p-3 w-full outline-[#c70039] hover:border-[#c70039]"
            />
            <Select
              value={instansi}
              onChange={setInstansi}
              options={instansiOptions}
              placeholder="Instansi Tujuan *"
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  cursor: 'pointer',
                  padding: '4px',
                  borderColor: state.isFocused ? '#c70039' : '#d1d5dc',
                  boxShadow: state.isFocused ? '0 0 0 1px #c70039' : 'none',
                  '&:hover': { borderColor: '#c70039' },
                }),
                placeholder: (base) => ({ ...base, color: '#9ca3af' }),
              }}
              isSearchable
            />
            <button
              type="submit"
              disabled={loadingNama}
              className="bg-[#c70039] text-white font-bold px-5 py-3 rounded hover:bg-[#a00030] cursor-pointer transition-colors duration-200"
            >
              {loadingNama ? 'Mencari...' : 'Cari Laporan'}
            </button>
          </form>

          {errorNama && <p className="text-red-600 text-sm mt-1">{errorNama}</p>}

          {detailTerpilih && (
            <section className="border-t pt-6 space-y-4">
              <h2 className="text-xl font-semibold select-none">Detail Laporan Terpilih</h2>
              <MinimalDetail laporan={detailTerpilih} />
              <button
                onClick={() => setDetailTerpilih(null)}
                className="mt-4 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
              >
                Tutup Detail
              </button>
            </section>
          )}

          {!detailTerpilih && riwayat.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 select-none">Riwayat Laporan</h3>
              <ul className='flex flex-col gap-5'>
                {riwayat.map(lap => (
                  <li
                    key={lap.kode_laporan}
                    onClick={() => fetchDetailByKode(lap.kode_laporan)}
                    className="border rounded p-3 gap-5 flex flex-col cursor-pointer hover:bg-gray-50 select-none"
                  >
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>{lap.kode_laporan}</span>
                      <span>{lap.status}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-xs italic">
                      <span>{lap.instansi}</span>
                      <span>{lap.tanggal}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4 items-center text-sm">
                <button
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  ← Sebelumnya
                </button>
                <span>Halaman {page} dari {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => goToPage(page + 1)}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Berikutnya →
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {hasilKode && (
        <section className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-semibold select-none">Detail Laporan</h2>
          <MinimalDetail laporan={hasilKode} />
          <button
            onClick={() => setHasilKode(null)}
            className="mt-4 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
          >
            Cari Lagi
          </button>
        </section>
      )}
    </div>
  );
}

function MinimalDetail({ laporan }: { laporan: LaporanDetail }) {
  return (
    <div className="bg-white shadow rounded-lg p-5 border border-gray-200 space-y-3 text-gray-800">
      <DetailRow label="Kode Laporan :" value={laporan.kode_laporan} />
      <DetailRow label="Status :" value={laporan.status} />
      <DetailRow label="Nama :" value={laporan.nama} />
      <DetailRow label="Instansi Tujuan :" value={laporan.instansi} />
      <DetailRow label="Lokasi Kampus :" value={laporan.location || '-'} />
      <DetailRow label="Tanggal Lapor :" value={laporan.tanggal} />
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="gap-2 flex flex-col text-sm">
      <div className='flex flex-col'>
        <span className="font-semibold">{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
