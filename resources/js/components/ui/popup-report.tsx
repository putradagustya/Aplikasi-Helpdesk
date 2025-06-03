interface PopupReport {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupReport({ isOpen, onClose }: PopupReport) {
  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 flex items-center justify-center z-1000"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-desc"
    >
      <div className="bg-white rounded-lg max-w-xl w-11/12 p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-700 hover:text-red-600 font-bold text-lg" onClick={onClose} type="button">×</button>

        <h2 id="popup-title" className="text-xl font-bold mb-4 text-red-700">Tata Cara Menyampaikan Pengaduan</h2>
        
        <div id="popup-desc" className="text-sm leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto">
          <p>1. Gunakan bahasa yang sopan dan jelas.</p>
          <p>2. Jelaskan masalah secara detail dan singkat.</p>
          <p>3. Sertakan bukti pendukung jika ada (foto, dokumen).</p>
          <p>4. Pilih instansi dan lokasi kampus dengan benar.</p>
          <p>5. Pastikan data diri diisi dengan benar agar dapat dihubungi kembali.</p>
          <p>6. Hindari pengaduan yang mengandung unsur SARA, fitnah, atau kebohongan.</p>
          <p>7. Laporan akan diproses sesuai prosedur yang berlaku.</p>
        </div>
      </div>
    </div>
  );
}
