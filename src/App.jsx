// src/App.jsx
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "/src/pages/home/home.jsx";
import { Bibliotheque } from "/src/pages/bibliotheque/bibliotheque.jsx";
import { Favorite } from "/src/pages/favorite/favorite.jsx";
import { Portail } from "/src/pages/portail/portail.jsx";
import { useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { Theme } from "@radix-ui/themes";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Footer } from "./components/Footer";
import "@radix-ui/themes/styles.css";

const navLinks = [
  { name: "Acceuil", path: "/home", element: <Home /> },
  { name: "Bibliotheque", path: "/bibliotheque", element: <Bibliotheque /> },
  { name: "Favoris", path: "/favoris", element: <Favorite /> },
  { name: "Mon portail", path: "/portail", element: <Portail /> },
];

// Mapping entre chemin et nom de page (pour handlePageChange)
const pathToPageName = {
  "/home": "Acceuil",
  "/bibliotheque": "Bibliotheque",
  "/favoris": "Favoris",
  "/portail": "Mon portail",
};

function AppContent() {
  const { theme, toggleTheme, handlePageChange } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Applique le thème
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Restaure la page au chargement
  useEffect(() => {
    const savedPath = localStorage.getItem("lastPage");

    if (savedPath && savedPath !== location.pathname) {
      const pageName = pathToPageName[savedPath] || "Home";
      handlePageChange(pageName);
      navigate(savedPath, { replace: true });
    } else if (!savedPath && location.pathname === "/") {
      handlePageChange("Acceuil");
      navigate("/home", { replace: true });
    } else {
      // Si on est déjà sur une page valide, met à jour le contexte
      const currentPageName = pathToPageName[location.pathname] || "Home";
      handlePageChange(currentPageName);
    }
  }, []);

  // Sauvegarde à chaque changement de page
  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("lastPage", location.pathname);
    }
  }, [location.pathname]);

  return (
    <Theme appearance={theme === "dark" ? "dark" : "light"} accentColor="indigo">
      <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#291F43]" : "bg-[#f5f5f5]"}`}>
        <Header />
        <main className="flex-1">
          <Routes>
            {navLinks.map((link) => (
              <Route key={link.name} path={link.path} element={link.element} />
            ))}
            {/* Route par défaut */}
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        {location.pathname !== "/portail" && <Footer />}
      </div>
    </Theme>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}