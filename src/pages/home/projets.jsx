import { Box, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { NexIcon } from "../../assets/icons/NextIcon";
import { HeartIcon } from "../../assets/icons/FavoriteIcon";
import { useAppContext } from "/src/context/AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProjetCard = ({ projet }) => {
  const { toggleFavorite, theme, setIsItemClicked, user, handlePageChange, setActiveSection } = useAppContext();
  const [liked, setLiked] = useState(projet.liked);
  const navigate = useNavigate();

  useEffect(() => setLiked(projet.liked), [projet.liked]);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    toggleFavorite(projet.id);
  };

  const handleClick = () => {
    if (!user) navigate("/login");
    else {
      setIsItemClicked(true);
      navigate("/bibliotheque", { state: { tutos: projet } });
      handlePageChange("Bibliotheque");
      setActiveSection("Tutos");
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={`group relative rounded-xl overflow-hidden shadow-xl cursor-pointer transition-transform hover:scale-105 ${
        theme === "dark" ? "bg-[#291f43]" : "bg-white"
      }`}
    >
      {/* === VIDÉO AVEC POSTER === */}
      <div className="relative">
        <video
          src={projet.url}               // ← ta vidéo (mp4, webm…)
          poster={projet.poster}         // ← NOUVEAU : image d’accueil
          className="w-full h-40 sm:h-48 object-cover"
          loop
          muted
          playsInline
          preload="metadata"
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        />
        {/* Bouton Play stylisé (optionnel) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-8 h-8 ml-1 text-[#291f43]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* === CŒUR LIKE === */}
      <motion.div
        className="absolute top-2 right-2"
        onClick={handleLike}
        animate={{ scale: liked ? 1.3 : 1 }}
      >
        <HeartIcon filled={liked} color={theme === "dark" ? "#ccc" : "#382b2bff"} />
      </motion.div>

      {/* === INFOS === */}
      <div className="p-4 space-y-2">
        <Text className={`font-bold text-center text-sm sm:text-base ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}>
          {projet.name}
        </Text>
        <div className="flex justify-between text-xs opacity-80">
          <span>{projet.auteur}</span>
          <span>{projet.domaine}</span>
        </div>
      </div>
    </Box>
  );
};

export function Projets() {
  const { projects, handlePageChange, setActiveSection, theme } = useAppContext();
  const navigate = useNavigate();

  return (
    <section
      className={`p-6 sm:p-8 rounded-2xl shadow-xl ${
        theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
      }`}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Description */}
        <div className="space-y-4 lg:col-span-1 flex flex-col justify-center">
          <div className="flex flex-col">
            <Text className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333]"}`}>
              Les meilleurs
            </Text>
            <Text className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
              Projets Tutorés
            </Text>
          </div>
          <hr className="w-50 h-1 bg-[#58D5BA] opacity-70" />
          <Text className={`text-sm sm:text-base ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333]"}`}>
            Des solutions développées par les étudiants et la communauté open source.
          </Text>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:col-span-2">
          {projects.slice(0, 4).map((p) => (
            <ProjetCard key={p.id} projet={p} />
          ))}
        </div>
      </div>

      {/* Bouton next */}
      <div className="flex justify-center mt-8">
        <div
          onClick={() => {
            handlePageChange("Bibliotheque");
            navigate("/bibliotheque");
            setActiveSection("Tutos");
          }}
          className={`p-4 rounded-full cursor-pointer transition-transform hover:scale-110 ${
            theme === "dark" ? "bg-[#291f43]" : "bg-white"
          } shadow-lg`}
        >
          <NexIcon />
        </div>
      </div>
    </section>
  );
}