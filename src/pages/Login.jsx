// src/pages/Login.jsx
import { Box, Text, TextField, Button } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { MailIcon, LockIcon } from "lucide-react";


export function Login() {
  const { theme, setUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setUser({
      id: 1,
      name: "Alex Dev",
      email: "alex.dev@esi.dz",
      role: "Étudiant GL",
      formation: "Ingénieur ESI",
      description: "Full-stack & open-source addict",
      competences: ["React", "Node.js", "Tailwind"],
      parcours: [{ annee: "2025", niveau: "M2", filiere: "SI", etablissement: "ESI", statut: "encours" }]
    });

    const redirectTo = location.state?.from || "/home";
    navigate(redirectTo);
  };

  return (
    <>
     <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} p-4`}>
        <Box
          className={`w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-xl border ${
            theme === "dark" 
              ? "bg-[#3C2E69]/90 border-[#5472E4]/30" 
              : "bg-white/95 border-gray-200"
          }`}
        >
          {/* Titre */}
          <Text className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#58D5BA] to-[#7AA2FF] bg-clip-text text-transparent">
            Connexion
          </Text>

          {/* Formulaire */}
          <div className="space-y-6">
            <TextField.Root placeholder="Email" size="3">
              <TextField.Slot>
                <MailIcon className="text-[#58D5BA]" />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root type="password" placeholder="Mot de passe" size="3">
              <TextField.Slot>
                <LockIcon className="text-[#58D5BA]" />
              </TextField.Slot>
            </TextField.Root>

            <Button 
              onClick={handleLogin} 
              size="4" 
              className="w-full cursor-pointer font-bold text-lg"
            >
              Se connecter
            </Button>
          </div>

          {/* Lien inscription */}
          <Text className="text-center mt-8 text-sm opacity-80">
            Pas de compte ?{" "}
            <span 
              onClick={() => navigate("/register")} 
              className="text-[#58D5BA] font-bold cursor-pointer hover:underline"
            >
              Inscris-toi
            </span>
          </Text>
        </Box>
      </div>
    </>
  );
}