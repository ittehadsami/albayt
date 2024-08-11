import { useState } from "react";

export default function Header() {
  const [navActive, setNavActive] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full py-4 z-40 ${
        navActive ? "bg-rich-black-fogra-29" : "absolute"
      }`}
    >
      <div className="container flex justify-between items-center">
        <div className="text-white text-4xl">Logo</div>
        <button
          onClick={() => setNavActive(!navActive)}
          className="text-white text-4xl"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      {navActive && (
        <nav className="fixed top-0 right-0 w-[300px] h-full bg-rich-black-fogra-29 z-30 transition-transform transform">
          <button
            onClick={() => setNavActive(false)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <i className="fas fa-times"></i>
          </button>
          <ul className="mt-20">
            <li className="border-t border-white/10 py-4 px-6">
              <a href="#" className="text-white uppercase">
                Home
              </a>
            </li>
            {/* More links */}
          </ul>
        </nav>
      )}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-black opacity-30 z-20 transition-opacity ${
          navActive ? "opacity-30" : "opacity-0"
        }`}
      />
    </header>
  );
}
