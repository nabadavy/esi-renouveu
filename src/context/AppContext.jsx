import { createContext, useContext, useState, useEffect } from "react";
import isiData from "/src/data/isi.json";
import rtData from "/src/data/rt.json";
import glData from "/src/data/gl.json";
import tc1Data from "/src/data/tc1.json";
import tc2Data from "/src/data/tc2.json";
import irsData from "/src/data/irs.json";
import dsData from "/src/data/ds.json";
import daData from "/src/data/da.json";
import csData from "/src/data/cs.json";
import { v4 as uuidv4 } from "uuid";

const classMap = {
  isi: isiData,
  rt: rtData,
  gl: glData,
  tc1: tc1Data,
  tc2: tc2Data,
  irs: irsData,
  ds: dsData,
  da: daData,
  cs: csData,
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [activePage, setActivePage] = useState("Home");

  // ---- NEWS ----
  const [newsBooks, setNewsBooks] = useState(() => {
    const savedNewsBooks = localStorage.getItem("newsBooks");
    return savedNewsBooks
      ? JSON.parse(savedNewsBooks)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          data.news.map((book, index) => ({
            ...book,
            id: book.id || `${classKey}-news-${index}`,
            classe: classKey.toLowerCase(),
            liked: localStorage.getItem("favorites")
              ? JSON.parse(localStorage.getItem("favorites")).includes(
                  book.id || `${classKey}-news-${index}`
                )
              : false,
          }))
        );
  });

  // ---- LIBRARY ----
  const [libraryBooks, setLibraryBooks] = useState(() => {
    const savedLibraryBooks = localStorage.getItem("libraryBooks");
    return savedLibraryBooks
      ? JSON.parse(savedLibraryBooks)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          Object.entries(data.bibliotheque || {}).flatMap(
            ([sectionKey, section]) =>
              section.map((item, index) => ({
                ...item,
                id: item.id || `${classKey}-${sectionKey}-${index}`,
                type: sectionKey,
                classe: classKey.toLowerCase(),
                liked: localStorage.getItem("favorites")
                  ? JSON.parse(localStorage.getItem("favorites")).includes(
                      item.id || `${classKey}-${sectionKey}-${index}`
                    )
                  : false,
              }))
          )
        );
  });

  // ---- PROJECTS ----
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects
      ? JSON.parse(savedProjects)
      : Object.entries(classMap).flatMap(([classKey, data]) =>
          Object.entries(data.projets || {}).flatMap(([sectionKey, section]) =>
            section.map((item, index) => ({
              ...item,
              id: item.id || `${classKey}-${sectionKey}-${index}`,
              type: "tutos",
              classe: classKey.toLowerCase(),
              liked: localStorage.getItem("favorites")
                ? JSON.parse(localStorage.getItem("favorites")).includes(
                    item.id || `${classKey}-${sectionKey}-${index}`
                  )
                : false,
            }))
          )
        );
  });

  // ---- USER ----
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "COMPAORE Salomon",
          email: "compaore@example.com",
          formation: "Licence 3 * Informatique * ESI * UNB",
          description:
            "Passionné du DevOps - Co-Founder de MicraV - Co-Founder MULTIVERUS",
          competences: ["REACT", "Tailwindcss", "TypeScript", "Postman"],
          parcours: [
            {
              annee: "2023-2024",
              niveau: "Licence 1",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "termine",
            },
            {
              annee: "2024-2025",
              niveau: "Licence 2",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "termine",
            },
            {
              annee: "2025-2026",
              niveau: "Licence 3",
              filiere: "Informatique",
              etablissement: "ESI/UNB",
              statut: "encours",
            },
          ],
        };
  });

  // ---- BIBLIOTHÈQUE ----
  const [selectedClass, setSelectedClass] = useState(
      localStorage.getItem("selectedClass") || "isi"
    );

  useEffect(() => {
    localStorage.setItem("selectedClass", selectedClass);
  }, [selectedClass]);


  const [activeSection, setActiveSection] = useState("Cours");
  const [direction, setDirection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isItemClicked, setIsItemClicked] = useState(false);

  // ---- Favoris ----
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setNewsBooks((prev) =>
      prev.map((book) => ({
        ...book,
        liked: favorites.includes(book.id),
      }))
    );
    setLibraryBooks((prev) =>
      prev.map((item) => ({
        ...item,
        liked: favorites.includes(item.id),
      }))
    );
    setProjects((prev) =>
      prev.map((item) => ({
        ...item,
        liked: favorites.includes(item.id),
      }))
    );
  }, [favorites]);

  // ---- USER SAVE ----
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // ---- DATA SAVE ----
  useEffect(() => {
    localStorage.setItem("newsBooks", JSON.stringify(newsBooks));
    localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [newsBooks, libraryBooks, projects]);

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const addPublication = (publication) => {
    if (
      !publication.type ||
      !publication.domaine ||
      !publication.classe ||
      !publication[
        publication.type === "tutos" ? "name" : "title"
      ]
    ) {
      return;
    }

    const newId = uuidv4();
    const publicationWithMeta = {
      ...publication,
      id: newId,
      auteur: user.name,
      classe: publication.classe.toLowerCase(),
      liked: false,
      type: publication.type === "livre" ? "livre" : publication.type,
    };

    if (publication.type === "tutos") {
      setProjects((prev) => [...prev, { ...publicationWithMeta, type: "tutos" }]);
    } else if (publication.type === "cours" || publication.type === "livre") {
      setNewsBooks((prev) => [...prev, publicationWithMeta]);
    } else if (publication.type === "tdtp" || publication.type === "examens") {
      setLibraryBooks((prev) => [...prev, publicationWithMeta]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        theme,
        toggleTheme,
        activePage,
        handlePageChange,
        newsBooks,
        setNewsBooks,
        libraryBooks,
        setLibraryBooks,
        projects,
        setProjects,
        selectedClass,
        setSelectedClass,
        activeSection,
        setActiveSection,
        direction,
        setDirection,
        searchTerm,
        setSearchTerm,
        isItemClicked,
        setIsItemClicked,
        user,
        setUser,
        addPublication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
