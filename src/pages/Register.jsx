// src/pages/Register.jsx
import { Box, Text, TextField, Button } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, UserIcon } from "lucide-react";

export function Register() {
  const { theme, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleRegister = () => {
    setUser({
      id: Date.now(),
      name: "Nouvel Utilisateur",
      email: "nouveau@esi.dz",
      role: "Étudiant",
      formation: "À compléter",
      description: "Bienvenue !",
      competences: [],
      parcours: []
    });
    navigate("/home");
  };

  return (
   <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-[#291F43]" : "bg-[#F5F5F5]"} p-4`}>
      <Box
        className={`w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-xl border ${
          theme === "dark" 
            ? "bg-[#3C2E69]/90 border-[#5472E4]/30" 
            : "bg-white/95 border-gray-200"
        }`}
      >
        <Text className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#7AA2FF] to-[#58D5BA] bg-clip-text text-transparent">
          Inscription
        </Text>

        <div className="space-y-6">
          <TextField.Root placeholder="Nom complet" size="3">
            <TextField.Slot><UserIcon className="text-[#58D5BA]" /></TextField.Slot>
          </TextField.Root>

          <TextField.Root placeholder="Email" size="3">
            <TextField.Slot><MailIcon className="text-[#58D5BA]" /></TextField.Slot>
          </TextField.Root>

          <TextField.Root type="password" placeholder="Mot de passe" size="3">
            <TextField.Slot><LockIcon className="text-[#58D5BA]" /></TextField.Slot>
          </TextField.Root>

          <Button 
            onClick={handleRegister} 
            size="4" 
            className="w-full cursor-pointer font-bold text-lg"
          >
            Créer mon compte
          </Button>
        </div>

        <Text className="text-center mt-8 text-sm opacity-80">
          Déjà inscrit ?{" "}
          <span 
            onClick={() => navigate("/login")} 
            className="text-[#58D5BA] font-bold cursor-pointer hover:underline"
          >
            Connexion
          </span>
        </Text>
      </Box>
    </div>
  );
}