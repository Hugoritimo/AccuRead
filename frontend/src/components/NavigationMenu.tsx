import React from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaFileAlt, FaBuilding, FaBell, FaUser } from "react-icons/fa";

const NavigationMenu = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around shadow-lg z-50">
      <div
        onClick={() => router.push("/home")}
        className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer"
      >
        <FaHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </div>

      <div
        onClick={() => router.push("/select")}
        className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer"
      >
        <FaBuilding className="text-2xl" />
        <span className="text-xs">Empresa</span>
      </div>

      <div
        onClick={() => router.push("/notification")}
        className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer"
      >
        <FaBell className="text-2xl" />
        <span className="text-xs">Notificações</span>
      </div>

      <div
        onClick={() => router.push("/profile")}
        className="flex flex-col items-center text-gray-600 hover:text-indigo-600 cursor-pointer"
      >
        <FaUser className="text-2xl" />
        <span className="text-xs">Perfil</span>
      </div>
    </nav>
  );
};

export default NavigationMenu;
