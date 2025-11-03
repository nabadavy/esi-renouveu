import { Text, Box } from "@radix-ui/themes";
import { RobotProfSVG } from "../../components/RobotProfSVG";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";

export function Welcome() {
  const { handlePageChange, setActiveSection, theme } = useAppContext();
  const navigate = useNavigate();

  return (
    <section
      className={`min-h-screen flex items-center ${
        theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Texte */}
          <Box className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} space-y-6`}>
            <div className="space-y-2 flex flex-col">
              <Text className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                Bienvenue sur Votre espace
              </Text>
              <Text className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
                Le renouveau
              </Text>
            </div>
            <hr className="w-50 h-1 bg-[#58D5BA] opacity-70" />
            <Text className="text-base mb-5 sm:text-lg">
              Toutes les ressources dont vous aurez besoin pour un meilleur apprentissage
            </Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  handlePageChange("Mon portail");
                  navigate("/portail");
                }}
                className={`w-full sm:w-64 h-12 font-bold rounded-lg transition-transform hover:scale-105 ${
                  theme === "dark" ? "bg-[#5472E4]" : "bg-[#4B6ACF]"
                } text-white`}
              >
                Mon portail
              </button>
              <button
                onClick={() => {
                  handlePageChange("Bibliotheque");
                  navigate("/bibliotheque");
                  setActiveSection("Cours");
                }}
                className={`w-full sm:w-64 h-12 font-bold rounded-lg border-2 transition-colors ${
                  theme === "dark"
                    ? "border-[#5472E4] text-[#5472E4] hover:bg-[#5472E4]/10"
                    : "border-[#4B6ACF] text-[#4B6ACF] hover:bg-[#4B6ACF]/10"
                }`}
              >
                Explorer
              </button>
            </div>
          </Box>

          {/* SVG */}
          <Box className="flex justify-center">
            <div className="w-full max-w-lg">
              <RobotProfSVG />
            </div>
          </Box>
        </div>
      </div>
    </section>
  );
}