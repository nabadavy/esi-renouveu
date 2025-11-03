import { Box, Text, Heading } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { Download, Share2 } from "lucide-react";
import { VideoPlayer } from "../../components/VideoPlayer";

export function TutosInfos({ tutos }) {
  const { theme } = useAppContext();

  // === Téléchargement ===
  const handleDownload = () => {
    if (!tutos?.url) {
      alert("Aucune vidéo à télécharger !");
      return;
    }

    const link = document.createElement("a");
    link.href = tutos.url;
    link.download = tutos.name ? `${tutos.name}.mp4` : "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === Partage direct du lien vidéo ===
  const handleShare = async () => {
    if (!tutos?.url) {
      alert("Aucune vidéo à partager !");
      return;
    }

    const shareData = {
      title: tutos.name || "Tutoriel vidéo",
      text: `Découvrez ce tutoriel : ${tutos.name || "Cours en ligne"}`,
      url: tutos.url, // 🔥 Lien direct vers la vidéo
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Lien de la vidéo copié dans le presse-papiers !");
      }
    } catch (err) {
      console.error("Erreur lors du partage :", err);
      alert("Le partage a échoué.");
    }
  };

  return (
    <Box
      className={`w-full max-w-5xl mx-auto rounded-2xl p-8 shadow-2xl overflow-hidden ${
        theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
      }`}
    >
      {/* === TITRE === */}
      <Heading
        className={`text-center text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-[#58D5BA] to-[#7AA2FF] bg-clip-text text-transparent`}
      >
        {tutos?.name || "Titre du Tuto"}
      </Heading>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* === COLONNE VIDÉO === */}
        <div className="order-2 lg:order-1">
          {tutos?.url ? (
            <VideoPlayer src={tutos.url} poster={tutos.poster} />
          ) : (
            <div className="bg-gray-800 border-4 border-dashed rounded-xl w-full aspect-video flex items-center justify-center">
              <Text className="text-2xl opacity-50">Vidéo non disponible</Text>
            </div>
          )}

          {/* === ACTIONS === */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-[#58D5BA] text-white rounded-lg font-bold hover:bg-[#4AB8A1] transition"
            >
              <Download size={20} />
              Télécharger
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-[#7AA2FF]/20 text-[#7AA2FF] rounded-lg font-bold hover:bg-[#7AA2FF]/30 transition"
            >
              <Share2 size={20} />
              Partager
            </button>
          </div>
        </div>

        {/* === COLONNE INFOS === */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="flex items-center justify-between py-4 border-b border-white/20">
            <Text className="font-bold text-lg">Auteur</Text>
            <Text className={`text-lg ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333]"}`}>
              {tutos?.auteur || "Inconnu"}
            </Text>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/20">
            <Text className="font-bold text-lg">Domaine</Text>
            <Text className={`text-lg ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333]"}`}>
              {tutos?.domaine || "Général"}
            </Text>
          </div>

          <div className="py-4">
            <Text className="font-bold text-lg mb-3">Description</Text>
            <Text
              className={`text-base leading-relaxed ${
                theme === "dark" ? "text-[#E2DDFE]/90" : "text-[#333]/90"
              }`}
            >
              {tutos?.description ||
                "Ce tutoriel vous guide pas à pas dans la maîtrise d’un concept clé. Préparez-vous à coder, expérimenter et exceller !"}
            </Text>
          </div>

          {tutos?.tags && (
            <div className="flex flex-wrap gap-2 pt-4">
              {tutos.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    theme === "dark"
                      ? "bg-[#4C4377] text-[#58D5BA]"
                      : "bg-white text-[#1F6692]"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}
