import { useEffect, useState } from "react";
import { Box, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { CoursIcon } from "../../assets/icons/CoursIcon";
import { HeartIcon } from "../../assets/icons/FavoriteIcon";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";

export const Document = ({ book }) => {
  const { toggleFavorite, theme, setIsItemClicked, user, handlePageChange } = useAppContext(); // Ajout de user
  const [liked, setLiked] = useState(book.liked);
  const navigate = useNavigate();

  useEffect(() => setLiked(book.liked), [book.liked]);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    toggleFavorite(book.id);
  };

  const handleClick = () => {
    if (!user) {
      // Non authentifié → redirect login
      navigate("/login");
    } else {
      // Authentifié → comportement normal
      setIsItemClicked(true);
      navigate("/bibliotheque", { state: { book } });
      handlePageChange("Bibliotheque");
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={`p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
        theme === "dark" ? "bg-[#291f43]" : "bg-white"
      } shadow-md`}
    >
      <div className="flex items-center gap-4">
        <CoursIcon className="w-10 h-10" />
        <div className="flex-1">
          <Text className="font-bold text-sm sm:text-base" style={{ color: theme === "dark" ? "#E2DDFE" : "#333" }}>
            {book.title}
          </Text>
          <Text className="text-xs opacity-80">{book.classe}</Text>
        </div>
        <div className="text-right space-y-2">
          <motion.div onClick={handleLike} animate={{ scale: liked ? 1.3 : 1 }}>
            <HeartIcon filled={liked} color={theme === "dark" ? "#ccc" : "#666"} />
          </motion.div>
          <Text className="text-xs">{book.annee}</Text>
        </div>
      </div>
    </Box>
  );
};

export function News() {
  const { newsBooks, handlePageChange, setActiveSection, theme } = useAppContext();
  const navigate = useNavigate();

  return (
    <section
      className={`p-6 sm:p-8 rounded-2xl shadow-xl ${
        theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
      }`}
    >
      <div className="text-center mb-8">
        <Text className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
          Nouveautés
        </Text>
       <hr className="w-50 h-1 bg-[#58D5BA] opacity-70 flex mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsBooks.slice(0, 6).map((b) => (
          <Document key={b.id} book={b} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            handlePageChange("Bibliotheque");
            navigate("/bibliotheque");
            setActiveSection("Cours");
          }}
          className={`px-10 py-3 rounded-lg font-bold transition-transform hover:scale-105 ${
            theme === "dark"
              ? "bg-[#291f43] text-[#E2DDFE]"
              : "bg-white text-[#333333]"
          } shadow-lg`}
        >
          Voir plus
        </button>
      </div>
    </section>
  );
}