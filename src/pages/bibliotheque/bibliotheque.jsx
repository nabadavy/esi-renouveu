import { Box, Text, Select } from "@radix-ui/themes";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document } from "../home/news";
import { ProjetCard } from "../home/projets";
import { useAppContext } from "/src/context/AppContext";
import { DownIcon } from "../../assets/icons/DownIcon";
import { UpIcon } from "../../assets/icons/UpIcon";
import { DocInfo } from "./docInfo";
import { TutosInfos } from "./tutosInfos";
import { BackIcon } from "../../assets/icons/BackIcon";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarLinks = [
  { name: "Cours", key: "cours" },
  { name: "TD & TP", key: "tdtp" },
  { name: "Examens", key: "examens" },
  { name: "Livres", key: "livres" },
  { name: "Tutos", key: "tutos" },
];

export function Bibliotheque() {
  const {
    newsBooks,
    libraryBooks,
    projects,
    selectedClass,
    setSelectedClass,
    activeSection,
    setActiveSection,
    direction,
    setDirection,
    searchTerm,
    setSearchTerm,
    theme,
    isItemClicked,
    setIsItemClicked,
  } = useAppContext();
  const contentRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBook = location.state?.book;
  const selectedTutos = location.state?.tutos;

  // Fusion dynamique des données
  const getFullSectionData = (sectionKey) => {
    const lowerClass = selectedClass.toLowerCase();
    const allData = {
      cours: [
        ...newsBooks.filter((n) => n.type === "cours" && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "cours" && b.classe.toLowerCase() === lowerClass),
      ],
      tdtp: libraryBooks.filter((b) => b.type === "tdtp" && b.classe.toLowerCase() === lowerClass),
      examens: libraryBooks.filter((b) => b.type === "examens" && b.classe.toLowerCase() === lowerClass),
      livres: [
        ...newsBooks.filter((n) => n.type === "livre" && n.classe.toLowerCase() === lowerClass),
        ...libraryBooks.filter((b) => b.type === "livres" && b.classe.toLowerCase() === lowerClass),
      ],
      tutos: projects.filter((p) => p.classe.toLowerCase() === lowerClass),
    };
    return allData[sectionKey] || [];
  };

  // Filtrage selon la recherche
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

  // Remonte le scroll à chaque changement
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection, selectedClass]);

  // Gestion de la direction d'animation
  const handleSectionChange = (newSection) => {
    const currentIndex = sidebarLinks.findIndex((l) => l.name === activeSection);
    const newIndex = sidebarLinks.findIndex((l) => l.name === newSection);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
    setSearchTerm(""); // Réinitialise la recherche
    setIsItemClicked(false); // Reset état item cliqué
    setIsSidebarOpen(false); // Ferme sidebar sur mobile
  };

  // Rendu du contenu
  const renderContent = () => {
    const sectionKey = sidebarLinks.find((s) => s.name === activeSection)?.key;
    if (!sectionKey) return null;

    const fullData = getFullSectionData(sectionKey);
    const content = filterContent(fullData);

    if (["cours", "tdtp", "examens", "livres"].includes(sectionKey)) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {content.map((doc) => (
            <Document
              key={doc.id}
              book={doc}
              // No onClick prop needed; internal handling in Document is consistent
            />
          ))}
          {content.length === 0 && (
            <Text
              className={`text-center col-span-full ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-80`}
            >
              Aucun document trouvé
            </Text>
          )}
        </div>
      );
    }

    if (sectionKey === "tutos") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {content.map((proj) => (
            <ProjetCard
              key={proj.id}
              projet={proj}
              onClick={() => {
                setIsItemClicked(true);
                navigate("/bibliotheque", { state: { tutos: proj } });
              }}
            />
          ))}
          {content.length === 0 && (
            <Text
              className={`text-center col-span-full ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} opacity-80`}
            >
              Aucun tutoriel trouvé
            </Text>
          )}
        </div>
      );
    }

    return (
      <Text className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
        Aucune donnée disponible.
      </Text>
    );
  };

  // Variantes d’animation slide horizontal
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 150 : -150, opacity: 0 }),
  };

  // Animation pour sidebar
  const sidebarVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Animation pour icône toggle
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180, transition: { duration: 0.3 } },
  };

  const handleBack = () => {
    setIsItemClicked(false);
    navigate("/bibliotheque", { state: {} }); // Clear state
  };

  return (
    <Box
      className={`min-h-screen w-full flex md:flex-row pt-16 ${
        theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"
      }`}
    >
     <div className="md:flex">
         {/* Sidebar */}
        <Box
            className={`w-full md:w-64 flex-shrink-0 ${
            theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
            } md:min-h-screen`}
        >
            {/* Sélecteur de classe */}
            <Box className="p-4 border-b border-opacity-50 flex mx-auto">
              <Select.Root onValueChange={setSelectedClass} defaultValue={selectedClass}>
                <Select.Trigger className="w-full" />
                <Select.Content>
                  <Select.Item value="tc1">TC1</Select.Item>
                  <Select.Item value="tc2">TC2</Select.Item>
                  <Select.Item value="isi">ISI</Select.Item>
                  <Select.Item value="irs">IRS</Select.Item>
                  <Select.Item value="rt">RT</Select.Item>
                  <Select.Item value="gl">GL</Select.Item>
                  <Select.Item value="ds">DS</Select.Item>
                  <Select.Item value="da">DA</Select.Item>
                  <Select.Item value="cs">CS</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>


            {/* Toggle pour mobile */}
            <div className="p-4 flex items-center justify-between md:hidden cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Text className={`font-bold text-lg ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
                Sections
            </Text>
            <motion.div variants={iconVariants} animate={isSidebarOpen ? "open" : "closed"}>
                {isSidebarOpen ? <UpIcon /> : <DownIcon />}
            </motion.div>
            </div>

            {/* Liens sidebar - animés sur mobile */}
            <AnimatePresence>
            {isSidebarOpen && (
                <motion.div
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`flex flex-col md:hidden`}
                >
                {sidebarLinks.map((link, index) => (
                    <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSectionChange(link.name)}
                    className={`py-3 px-6 cursor-pointer transition-colors ${
                        activeSection === link.name
                        ? `${theme === "dark" ? "bg-[#291F43] text-[#58D5BA]" : "bg-white text-[#4B6ACF]"}`
                        : `${theme === "dark" ? "hover:bg-[#3C2E69]" : "hover:bg-[#E0E0E0]"}`
                    }`}
                    >
                    {link.name}
                    </motion.div>
                ))}
                </motion.div>
            )}
            </AnimatePresence>

            {/* Sidebar desktop (toujours visible) */}
            <div className="hidden md:flex flex-col">
            {sidebarLinks.map((link) => (
                <div
                key={link.name}
                onClick={() => handleSectionChange(link.name)}
                className={`py-3 px-6 cursor-pointer transition-colors ${
                    activeSection === link.name
                    ? `${theme === "dark" ? "bg-[#291F43] text-[#58D5BA]" : "bg-white text-[#4B6ACF]"}`
                    : `${theme === "dark" ? "hover:bg-[#3C2E69]" : "hover:bg-[#E0E0E0]"}`
                }`}
                >
                {link.name}
                </div>
            ))}
            </div>
        </Box>

        {/* Contenu principal */}
        <Box
            ref={contentRef}
            className={`flex-1 ${
            theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
            } overflow-y-auto p-6 md:p-8`}
        >
            {isItemClicked ? (
            <div className="mb-6 w-full">
                <button onClick={handleBack} className="flex items-center gap-2 text-blue-500 hover:underline">
                <BackIcon />
                Retour
                </button>
            </div>
            ) : (
            <Box className="mb-6 space-y-4 w-full">
                <Text className={`text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
                {activeSection} — Classe {selectedClass.toUpperCase()}
                </Text>
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un document ou un projet..."
                className={`w-full p-3 rounded-md ${
                    theme === "dark"
                    ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                    : "bg-white text-[#333333] placeholder-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA] block`}
                />
            </Box>
            )}

            <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={`${selectedClass}-${activeSection}-${searchTerm}-${isItemClicked}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="w-full overflow-x-hidden"
            >
                {isItemClicked ? (
                activeSection === "Tutos" ? <TutosInfos tutos={selectedTutos} /> : <DocInfo book={selectedBook} />
                ) : (
                renderContent()
                )}
            </motion.div>
            </AnimatePresence>
        </Box>
     </div>
    </Box>
  );
}