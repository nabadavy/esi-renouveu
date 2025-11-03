// src/components/Header.jsx
import { Logo } from "./Logo";
import * as Switch from "@radix-ui/react-switch";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User, Mail, Clock } from "lucide-react";
import { Box, Text } from "@radix-ui/themes";

export default function Header() {
  const { activePage, handlePageChange, theme, toggleTheme, user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = [
    { name: "Acceuil", path: "/home" },
    { name: "Bibliotheque", path: "/bibliotheque" },
    { name: "Favoris", path: "/favoris" },
    { name: "Mon portail", path: "/portail" }
  ];

  const handleLinkClick = (pageName, path) => {
    handlePageChange(pageName);
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    setIsProfileOpen(false);
  };

  // Ferme le pop-up si clic dehors
  useState(() => {
    const close = () => setIsProfileOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <nav className={`fixed top-0 ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} backdrop-blur-sm nav-bar flex justify-between items-center w-full h-16 z-50`}>
      <div className={`flex items-center justify-between w-[95%] max-w-[1400px] mx-auto border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"} h-full px-4`}>
        
        {/* LOGO + MENU */}
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.name, link.path)}
                className={`cursor-pointer transition-colors ${
                  activePage === link.name
                    ? `${theme === "dark" ? "text-[#9EB1FF]" : "text-[#4B6ACF]"} font-semibold`
                    : `${theme === "dark" ? "text-[#E2DDFE] hover:text-[#9EB1FF]" : "text-[#333333] hover:text-[#4B6ACF]"}`
                }`}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* DROITE : THÈME + PROFIL */}
        <section className="hidden lg:flex items-center gap-6">
          {/* Switch thème */}
          <Switch.Root
            className={`relative w-10 h-5 rounded-full ${theme === "dark" ? "bg-[#3C2E69]" : "bg-[#D1D5DB]"}`}
            onCheckedChange={toggleTheme}
            checked={theme === "dark"}
          >
            <Switch.Thumb className={`block w-4 h-4 rounded-full transition-transform ${theme === "dark" ? "translate-x-5 bg-[#5472E4]" : "translate-x-1 bg-[#4B6ACF]"}`} />
          </Switch.Root>

          {/* ICÔNE PROFIL CLIQUABLE */}
          <div className="relative">
            <div
              onClick={handleProfileClick}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="20" fill="#5472E4" />
                <path d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z" fill="white" />
                <path d="M20 22C16.134 22 13 25.134 13 29V30H27V29C27 25.134 23.866 22 20 22Z" fill="white" />
              </svg>
            </div>

            {/* POP-UP PROFIL */}
            {isProfileOpen && (
              <Box
                onClick={(e) => e.stopPropagation()}
                className={`absolute top-14 right-0 w-80 p-5 rounded-2xl shadow-2xl border ${
                  theme === "dark" ? "bg-[#3C2E69] border-gray-700" : "bg-white border-gray-200"
                } z-50`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5472E4] to-[#58D5BA] flex items-center justify-center text-white font-bold text-2xl">
                    {user?.name?.[0] || "?"}
                  </div>
                  <div>
                    <Text className="font-bold text-lg block">{user?.name || "Anonyme"}</Text>
                    <Text className="text-sm opacity-80">{user?.formation || "Étudiant"}</Text>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#58D5BA]" />
                    <span>{user?.email || "email@esi.dz"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-[#58D5BA]" />
                    <span>{user?.role || "Membre"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#58D5BA]" />
                    <span>Dernière connexion : {new Date().toLocaleDateString("fr")}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-600 flex gap-3">
                  <button
                    onClick={() => { handleLinkClick("Mon portail", "/portail"); setIsProfileOpen(false); }}
                    className="flex-1 py-2 bg-[#5472E4] hover:bg-[#4061C7] text-white rounded-lg text-sm font-medium transition"
                  >
                    Voir mon portail
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </div>
              </Box>
            )}
          </div>
        </section>

        {/* MENU MOBILE */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE OUVERT */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-16 left-0 w-full ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} shadow-lg z-40`}>
          <ul className="flex flex-col items-center gap-8 py-6">
            {links.map((link) => (
              <li
                key={link.name}
                onClick={() => handleLinkClick(link.name, link.path)}
                className={`text-2xl font-medium ${
                  activePage === link.name
                    ? "text-[#58D5BA]"
                    : theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                }`}
              >
                {link.name}
              </li>
            ))}
            <button onClick={handleLogout} className="text-red-400 flex items-center gap-2">
              <LogOut size={20} /> Déconnexion
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}