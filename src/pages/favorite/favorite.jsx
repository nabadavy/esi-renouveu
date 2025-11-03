import { Box, Text } from "@radix-ui/themes";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";
import { useAppContext } from "/src/context/AppContext";

const topLinks = [
  { name: "Cours", key: "cours" },
  { name: "TD & TP", key: "tdtp" },
  { name: "Examens", key: "examens" },
  { name: "Livres", key: "livres" },
  { name: "Tutos", key: "tutos" }
];

export function Favorite() {
  const { favorites, newsBooks, libraryBooks, projects, theme } = useAppContext();
  const [selectedClass, setSelectedClass] = useState("isi");
  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef(null);

  // Fusion dynamique des données favorites
  const getFullFavorites = (sectionKey) => {
    const lowerClass = selectedClass.toLowerCase();
    const allData = {
      cours: [
        ...newsBooks.filter((n) => n.type === "cours" && favorites.includes(n.id) && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "cours" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      ],
      tdtp: libraryBooks.filter((b) => b.type === "tdtp" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      examens: libraryBooks.filter((b) => b.type === "examens" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      livres: [
        ...newsBooks.filter((n) => n.type === "livre" && favorites.includes(n.id) && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "livres" && favorites.includes(b.id) && b.classe.toLowerCase() === lowerClass),
      ],
      tutos: projects.filter((p) => favorites.includes(p.id) && p.classe.toLowerCase() === lowerClass),
    };
    return allData[sectionKey] || [];
  };

  // Recherche locale dans les favoris
  const filterContent = (items) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(
      (i) =>
        i.title?.toLowerCase().includes(term) ||
        i.name?.toLowerCase().includes(term) ||
        i.auteur?.toLowerCase().includes(term) ||
        i.domaine?.toLowerCase().includes(term)
    );
  };

  // Scroll vers le haut lors du changement
  useEffect(() => {
    if (contentRef.current)
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection, selectedClass]);

  // Calcul direction d'animation
  const handleTabChange = (newSection) => {
    const currentIndex = topLinks.findIndex((l) => l.name === activeSection);
    const newIndex = topLinks.findIndex((l) => l.name === newSection);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
  };

  // Rendu du contenu
  const renderContent = () => {
    const sectionKey = topLinks.find((s) => s.name === activeSection)?.key;
    if (!sectionKey) return null;

    const content = filterContent(getFullFavorites(sectionKey));

    if (["cours", "tdtp", "examens", "livres"].includes(sectionKey)) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {content.map((doc) => (
            <Document key={doc.id} book={doc} />
          ))}
          {content.length === 0 && (
            <Text className={`font-bold text-3xl sm:text-4xl lg:text-5xl col-span-full ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-70`}>
              Aucun document favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    if (sectionKey === "tutos") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {content.map((proj) => (
            <ProjetCard key={proj.id} projet={proj} />
          ))}
          {content.length === 0 && (
            <Text className={`text-center col-span-full ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-70`}>
              Aucun projet favori trouvé.
            </Text>
          )}
        </div>
      );
    }

    return <Text className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>Aucune donnée disponible.</Text>;
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <Box className={`pt-16 w-full flex flex-col ${theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"} min-h-screen ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-8 gap-6 mt-6">
        <Box className="w-full lg:w-auto">
          <Text className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent text-center lg:text-left">
            Mes Favoris
          </Text>
          <hr className="w-50 h-1 bg-[#58D5BA] opacity-70" />
        </Box>
        <Box className="w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Rechercher un favori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 rounded-md ${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400" : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"} focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
          />
        </Box>
      </div>
      <Box className={`w-full mt-6 ${theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"} flex flex-wrap justify-center gap-4 p-4`}>
        {topLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleTabChange(link.name)}
            className={`px-4 py-2 font-semibold text-sm lg:text-base rounded-md transition-colors ${
              activeSection === link.name
                ? `${theme === "dark" ? "bg-[#291F43] text-[#58D5BA]" : "bg-[#FFFFFF] text-[#4B6ACF]"}`
                : `${theme === "dark" ? "hover:bg-[#291F43]" : "hover:bg-[#FFFFFF]"} hover:opacity-70`
            }`}
          >
            {link.name}
          </button>
        ))}
      </Box>

      <Box
        ref={contentRef}
        className="flex-grow w-full overflow-y-auto p-6"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${selectedClass}-${activeSection}-${searchTerm}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 }
            }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}