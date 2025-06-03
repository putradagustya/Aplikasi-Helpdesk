import PopupReport from '@/components/ui/popup-report';

import { router } from '@inertiajs/react';
import Select from 'react-select';
import { FormEvent, useState, useRef } from 'react';

interface Option {
  value: string;
  label: string;
}

export default function Form() {
  const [popup, setPopup] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [instansi, setInstansi] = useState<Option | null>(null);
  const [location, setLocation] = useState<Option | null>(null);
  const [ruang, setRuang] = useState('');
  const [detail, setDetail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUploadPlaceholder, setShowUploadPlaceholder] = useState(false);

  const instansiOptions: Option[] = [
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

  const locationOptions: Option[] = [
    { value: 'Kampus 1 : Pusat', label: 'Kampus 1 : Pusat' },
    { value: 'Kampus 2 : Viktor', label: 'Kampus 2 : Viktor' },
    { value: 'Kampus 3 : Witana Harja', label: 'Kampus 3 : Witana Harja' },
    { value: 'Kampus 4 : Serang', label: 'Kampus 4 : Serang' },
  ];

  const onUploadButtonClick = () => {
    setShowUploadPlaceholder(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const maxFiles = 3;
      const maxSizeMB = 2;

      let validFiles: File[] = [];
      let error = '';

      for (const file of selectedFiles) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          error = `Ukuran file "${file.name}" melebihi 2MB.`;
          break;
        }

        if (files.length + validFiles.length < maxFiles) {
          validFiles.push(file);
        } else {
          error = `Maksimal hanya ${maxFiles} file yang diperbolehkan.`;
          break;
        }
      }

      if (error) {
        setUploadError(error);
      } else {
        setFiles((prev) => [...prev, ...validFiles]);
        setUploadError('');
      }

      e.target.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !instansi || !location || !detail) {
      alert('Harap lengkapi laporan Anda!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('instansi', instansi.value);
    formData.append('location', location.value);
    formData.append('ruang', ruang);
    formData.append('message', detail);

    files.forEach((file) => {
      formData.append('attachments[]', file);
    });

    router.post('/report.send', formData, {
      forceFormData: true,
      onSuccess: () => {
        setName('');
        setUsername('');
        setInstansi(null);
        setLocation(null);
        setRuang('');
        setDetail('');
        setFiles([]);
        setShowUploadPlaceholder(false);
        setUploadError('');
        alert('Laporan berhasil dikirim!');
      },
      onError: (errors) => {
        console.error(errors);
        alert('Gagal mengirim laporan.');
      },
    });
  };

  return (
    <>
      <PopupReport isOpen={popup} onClose={() => setPopup(false)} />

      <div className="rounded mt-10 mx-auto p-8 max-w-3xl bg-white shadow-lg shadow-gray-800/40">
        <h1 className="rounded flex mb-6 p-3 justify-center items-center text-xl font-bold text-white bg-[#c70039] uppercase">Formulir Pengaduan</h1>

        <div className="flex mb-5 gap-1 justify-center items-center text-xs">
          <p>Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar</p>

          <p className="border px-3 py-1 border-[#c70039] text-[#c70039] cursor-pointer hover:opacity-50" onClick={() => setPopup(true)}>?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) setName(value);
            }}
            placeholder="Nama Lengkap *"
            required
            className="border border-gray-300 rounded p-3 w-full outline-[#c70039] hover:border-[#c70039]"
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="NIM/NIDN (Opsional)"
            className="border border-gray-300 rounded p-3 w-full outline-[#c70039] hover:border-[#c70039]"
          />

          <Select
            value={instansi}
            onChange={(option) => setInstansi(option)}
            options={instansiOptions}
            placeholder="Instansi Tujuan *"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                cursor: 'pointer',
                padding: '4px',
                borderColor: state.isFocused ? '#c70039' : '#d1d5dc',
                boxShadow: state.isFocused ? '0 0 0 1px #c70039' : 'none',
                '&:hover': {
                  borderColor: '#c70039',
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: '#9ca3af',
              }),
            }}
          />

          <Select
            value={location}
            onChange={(option) => setLocation(option)}
            options={locationOptions}
            placeholder="Lokasi Kampus *"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                cursor: 'pointer',
                padding: '4px',
                borderColor: state.isFocused ? '#c70039' : '#d1d5dc',
                boxShadow: state.isFocused ? '0 0 0 1px #c70039' : 'none',
                '&:hover': {
                  borderColor: '#c70039',
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: '#9ca3af',
              }),
            }}
          />

          <input
            type="text"
            value={ruang}
            onChange={(e) => setRuang(e.target.value)}
            placeholder="Ruang (Opsional)"
            className="border border-gray-300 rounded p-3 w-full outline-[#c70039] hover:border-[#c70039]"
          />

          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Ketik Isi Laporan Anda *"
            rows={6}
            required
            className="border border-gray-300 rounded p-3 w-full resize-y min-h-40 outline-[#c70039] hover:border-[#c70039]"
          />

          {showUploadPlaceholder && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border rounded border-gray-300 mb-4 p-3 flex justify-center items-center bg-gray-50 text-gray-700 cursor-pointer select-none"
            >
              LAMPIRAN MAKSIMAL 3 FILE (UKURAN 2MB)
            </div>
          )}

          {files.length > 0 && (
            <div className="mb-4 gap-3 grid grid-cols-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="border rounded border-gray-300 p-2 flex items-center justify-center text-xs text-gray-700 bg-white relative"
                  title={file.name}
                >
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="rounded max-h-20 object-contain"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 mb-1 text-gray-400"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-xs truncate max-w-[5rem]">{file.name}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded-full w-5 h-5 flex justify-center items-center text-xs text-white cursor-pointer absolute top-0 right-0 bg-red-600 opacity-80 hover:opacity-100"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="gap-4 flex justify-between items-center">
            <button
              type="button"
              onClick={onUploadButtonClick}
              className="gap-1 flex items-center text-gray-600 cursor-pointer hover:text-gray-900"
            >
              Upload Lampiran <span className="text-red-600 font-bold">({files.length})</span>
            </button>

            <button
              type="submit"
              className="rounded px-6 py-3 font-bold bg-[#c70039] text-white transition-colors duration-200 cursor-pointer hover:bg-[#a00030]"
            >
              Kirim Laporan!
            </button>
          </div>

          {uploadError && <p className="text-red-600 text-xs mt-1">{uploadError}</p>}
        </form>
      </div>
    </>
  );
}
