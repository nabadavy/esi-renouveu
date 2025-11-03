// src/pages/portail/portail.jsx
import { Box, Text } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { EditProfil } from "./editProfil";
import { Publication } from "./publications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Portail() {
    const { theme, user } = useAppContext();
    const navigate = useNavigate();

    // Vérification auth au montage
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Si pas d'user, return null (redirection en cours)
    if (!user) return null;

    return (
        <Box
            className={`w-full ${
                theme === "dark" ? "bg-[#2B2442]" : "bg-[#F5F5F5]"
            } pt-16 ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"}`}
        >
            {/* WRAPPER PRINCIPAL : Flex colonne → ligne */}
            <div className="flex flex-col lg:flex-row">
                {/* === PROFIL : hauteur auto sur mobile, pleine écran sur desktop === */}
                <div className="w-full lg:w-1/3 lg:fixed lg:inset-y-0 lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-10 lg:overflow-y-auto">
                    <Box
                        className={`w-full h-full ${
                            theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
                        } p-6 flex flex-col items-center shadow-xl`}
                    >
                        {/* Photo */}
                        <div className="flex justify-center mb-6">
                            <div
                                className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full ${
                                    theme === "dark" ? "bg-[#2B2442]" : "bg-[#D1D5DB]"
                                } flex items-center justify-center text-4xl font-bold text-[#58D5BA] shadow-md`}
                            >
                                {user.name ? user.name.split(" ")[0][0] : "?"}
                            </div>
                        </div>

                        {/* Nom & Formation */}
                        <div className="text-center mb-6">
                            <Text className="text-xl lg:text-2xl font-bold block">
                                {user.name || "Nom non défini"}
                            </Text>
                            <Text className={`block mt-2 text-base ${
                                theme === "dark" ? "text-[#7AA2FF]" : "text-[#4B6ACF]"
                            }`}>
                                {user.formation || "Formation non définie"}
                            </Text>
                        </div>

                        {/* Description */}
                        <div className="flex justify-center items-center mb-2">
                            <Text className="text-center text-base mb-6 px-4 max-w-xs">
                                {user.description || "Aucune description disponible"}
                            </Text>
                        </div>

                        {/* Compétences */}
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            {user.competences?.length > 0 ? (
                                user.competences.map((comp, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            theme === "dark" ? "bg-[#4C4377]" : "bg-[#D1D5DB]"
                                        }`}
                                    >
                                        {comp}
                                    </span>
                                ))
                            ) : (
                                <Text className="text-sm opacity-80">
                                    Aucune compétence ajoutée
                                </Text>
                            )}
                        </div>

                        {/* Parcours */}
                        <div className="w-full mb-8">
                            <Text className="font-bold text-base mb-3 block">
                                Mon parcours
                            </Text>
                            {user.parcours?.length > 0 ? (
                                <div className="space-y-3">
                                    {user.parcours.map((p, i) => (
                                        <div
                                            key={i}
                                            className={`grid grid-cols-2 lg:grid-cols-4 gap-2 px-4 py-3 rounded-md text-sm ${
                                                p.statut === "encours"
                                                    ? theme === "dark"
                                                        ? "bg-[#5472E4] text-white"
                                                        : "bg-[#4B6ACF] text-white"
                                                    : theme === "dark"
                                                        ? "bg-[#4C4377]"
                                                        : "bg-[#D1D5DB]"
                                            }`}
                                        >
                                            <span>{p.annee || "—"}</span>
                                            <span>{p.niveau || "—"}</span>
                                            <span>{p.filiere || "—"}</span>
                                            <span>{p.etablissement || "—"}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text className="text-sm opacity-80 text-center block">
                                    Aucun parcours ajouté
                                </Text>
                            )}
                        </div>

                        <EditProfil />
                    </Box>
                </div>

                {/* === ESPACE VIDE À GAUCHE SUR DESKTOP (pour compenser le fixed) === */}
                <div className="hidden lg:block lg:w-1/3" aria-hidden="true" />

                {/* === COLONNE PUBLICATIONS (défile partout) === */}
                <div className="w-full lg:w-2/3 min-h-screen">
                    <Publication />
                </div>
            </div>
        </Box>
    );
}