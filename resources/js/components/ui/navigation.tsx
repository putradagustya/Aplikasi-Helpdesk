import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

interface NavigationProps {
  scrolled: boolean;
  scrollToForm: () => void;
  scrollToStatus: () => void;
}

export default function Navigation({ scrolled, scrollToForm, scrollToStatus }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClick = (scrollFn: () => void) => {
    scrollFn();
    setIsOpen(false);
  };

  return (
    <>
      <button className={`block md:hidden relative transition-colors duration-300 ${scrolled ? "text-[#c70039]" : "text-white"}`} 
        onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <ul className={`md:flex md:static md:flex-row flex-col fixed top-[70px] right-0 w-full h-full transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"} md:translate-x-0 md:pointer-events-auto md:h-auto z-40 
        ${scrolled ? "bg-white text-black md:bg-transparent" : "bg-[#c70039] text-white md:bg-transparent"}`}>

        <li>
          <button onClick={() => handleClick(scrollToForm)}
            className="block p-3 font-semibold text-sm uppercase cursor-pointer transition duration-200 hover:opacity-80">
              Buat Laporan
          </button>
        </li>

        <li>
          <button onClick={() => handleClick(scrollToStatus)}
            className="block p-3 pr-0 font-semibold text-sm uppercase cursor-pointer transition duration-200 hover:opacity-80">
              Status Laporan
          </button>
        </li>
      </ul>
    </>
  );
}
