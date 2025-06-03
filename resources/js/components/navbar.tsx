import Navigation from "@/components/ui/navigation";

import { useEffect, useState } from "react";

interface NavbarProps {
  scrollToForm: () => void;
  scrollToStatus: () => void;
}

export default function Navbar({ scrollToForm, scrollToStatus }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`flex py-5 px-3 justify-center sticky top-0 z-100 transition-colors duration-300 
      ${scrolled ? "bg-white text-black shadow-lg" : "bg-[#c70039] text-white"}`}
    >
      <div className="flex w-full max-w-6xl justify-between items-center">
        <div className="flex">
          <a href="/" className="flex gap-1 items-center uppercase">
            <h1 className={`font-bold text-2xl md:text-4xl transition-colors duration-300 ${scrolled ? "text-[#c70039]" : "text-white"}`}>Unpam</h1>

            <h2 className="font-semibold text-xl md:text-2xl">HelpDesk</h2>
          </a>
        </div>

        <div><Navigation scrolled={scrolled} scrollToForm={scrollToForm} scrollToStatus={scrollToStatus} /></div>
      </div>
    </nav>
  );
}
