import { CheckCircle, Edit, Timer, Reply } from 'lucide-react';

const steps = [
  { icon: <Edit className="w-7 h-7" />, title: 'Tulis Laporan', desc: 'Laporkan keluhan anda dengan jelas dan lengkap', active: true },
  { icon: <Reply className="w-7 h-7 transform scale-x-[-1]" />, title: 'Verifikasi', desc: 'Laporan Anda akan diverifikasi oleh instansi berwenang' },
  { icon: <Timer className="w-7 h-7" />, title: 'Penanganan', desc: 'Laporan Anda akan ditindaklanjuti' },
  { icon: <CheckCircle className="w-7 h-7" />, title: 'Selesai', desc: 'Laporan Anda telah terselesaikan' },
];

export default function Work() {
  return (
    <div className="w-full py-5 bg-white rounded-lg flex justify-center">
      <div className="relative w-full max-w-5xl">
        <div className="hidden md:block absolute top-[30px] inset-x-0 mx-auto w-[85%] h-0.5 bg-gray-200 z-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center md:flex-col text-center md:text-center w-full md:w-1/5 px-2">
              <div className={`w-15 h-15 min-w-[60px] min-h-[60px] rounded-full flex items-center justify-center mb-0 md:mb-3 mr-4 md:mr-0 ${step.active ? 'bg-red-600 text-white' : 'bg-white text-black border border-gray-300'}`}>
                {step.icon}
              </div>
              <div className="text-left md:text-center">
                <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
