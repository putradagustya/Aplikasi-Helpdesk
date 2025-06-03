export default function Wave() {
  return (
    <>
      <style>
        {`
          @keyframes wave {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-25%);
            }
          }
          
          .animate-wave {
            animation: wave 6s ease-in-out infinite alternate;
          }
          `}
      </style>

      <div className="relative w-full h-[200px] bg-[#c70039] overflow-hidden">
        <svg viewBox="0 0 2880 150" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-[200%] h-full animate-wave">
          <path d="M0,80 C480,0 960,160 1440,80 C1920,0 2400,160 2880,80 L2880,150 L0,150 Z" fill="#ffffff" opacity="1" />
        </svg>
      </div>
    </>
  );
}
