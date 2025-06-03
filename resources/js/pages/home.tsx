import Footer from '@/components/footer';
import StatusLaporan from '@/components/status-laporan';
import TotalReport from '@/components/total-report';
import Work from '@/components/work';
import Form from '@/components/form';
import Wave from '@/components/wave';
import Navbar from '@/components/navbar';
import { useRef } from 'react';
import { Head } from '@inertiajs/react';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      const offsetTop = formRef.current.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToStatus = () => {
    if (statusRef.current) {
      const offsetTop = statusRef.current.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Beranda</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" />
      </Head>

      <div className="font-['Open_Sans'] text-sm text-gray-700 select-none">
        <Navbar scrollToForm={scrollToForm} scrollToStatus={scrollToStatus} />

        <div className="bg-[#c70039]">
          <div className="flex flex-col m-auto py-30 px-3 gap-3 max-w-6xl text-left md:text-center text-white">
            <h1 className="font-semibold text-[33px]">Layanan Pengaduan Online Universitas Pamulang</h1>
            <p className="font-light text-2xl">Sampaikan laporan Anda langsung kepada instansi berwenang</p>
          </div>

          <Wave />
        </div>

        {/* <div className="absolute top-88 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-50 max-[850px]:hidden">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-20 h-1 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div> */}

        <div className="-mt-60 mb-20 px-3 relative select-text" ref={formRef}><Form /></div>

        <div className="pb-10 px-3"><Work /></div>

        <div className='flex py-10 bg-[#c70039] text-white'><TotalReport /></div>

        <div className="px-3 select-text" ref={statusRef}><StatusLaporan /></div>

        <div className='flex mt-50 mb-10 mx-auto max-w-6xl justify-center'><a href="dashboard" className='border-b'>Panel Administrasi</a></div>

        <div className='select-text shadow-[0_5px_25px_rgba(0,0,0,0.2)]'><Footer /></div>
      </div>
    </>
  );
}
