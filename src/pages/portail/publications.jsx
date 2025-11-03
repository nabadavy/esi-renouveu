import { Box, Text, Button, Flex, TextField, TextArea, Select, Callout } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { ProjetCard } from "../home/projets";
import { Document } from "../home/news";
import { useState } from "react";
import { Upload, InfoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MySelect({ options, label, value, onChange, theme }) {
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger
                className={`w-full p-3 rounded-md ${
                    theme === "dark"
                        ? "bg-[#291F43] text-[#E2DDFE] border-gray-600"
                        : "bg-[#FFFFFF] text-[#333333] border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
            />
            <Select.Content>
                <Select.Group>
                    <Select.Label>{label}</Select.Label>
                    {options.map((option) => (
                        <Select.Item key={option} value={option}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}

export function Publication() {
    const { user, newsBooks, libraryBooks, projects, theme, addPublication } = useAppContext();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        type: "tutos",
        title: "",
        domaine: "",
        description: "",
        classe: "isi",
        source: null, // For file object
    });
    const [errors, setErrors] = useState({});

    // Filter publications by user.name
    const userPublications = {
        tutos: projects.filter((proj) => proj.auteur === user.name),
        cours: [
            ...newsBooks.filter((book) => book.type === "cours" && book.auteur === user.name),
            ...libraryBooks.filter((book) => book.type === "cours" && book.auteur === user.name),
        ],
        tdtp: libraryBooks.filter((book) => book.type === "tdtp" && book.auteur === user.name),
        examens: libraryBooks.filter((book) => book.type === "examens" && book.auteur === user.name),
        livres: [
            ...newsBooks.filter((book) => book.type === "livre" && book.auteur === user.name),
            ...libraryBooks.filter((book) => book.type === "livres" && book.auteur === user.name),
        ],
    };

    // Combine all publications for total count
    const allPublications = [
        ...userPublications.tutos,
        ...userPublications.cours,
        ...userPublications.tdtp,
        ...userPublications.examens,
        ...userPublications.livres,
    ];

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setFormData({
            type: "tutos",
            title: "",
            domaine: "",
            description: "",
            classe: "isi",
            source: null,
        });
        setErrors({});
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const sourceUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, source: sourceUrl }));
            setErrors((prev) => ({ ...prev, source: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Ce champ est requis";
        if (!formData.domaine.trim()) newErrors.domaine = "Ce champ est requis";
        if (!formData.description.trim()) newErrors.description = "Ce champ est requis";
        if (!formData.classe) newErrors.classe = "Ce champ est requis";
        if (!formData.source) newErrors.source = "Veuillez sélectionner un fichier";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const publication = {
            type: formData.type,
            [formData.type === "tutos" ? "name" : "title"]: formData.title,
            auteur: user.name,
            domaine: formData.domaine,
            description: formData.description,
            classe: formData.classe,
            [formData.type === "tutos" ? "url" : "file"]: formData.source,
        };
        addPublication(publication);
        setIsCreating(false);
    };

    const fileAccept = formData.type === "tutos" ? "video/mp4,video/avi,video/*" : ".pdf,.doc,.docx";

    return (
        <div
            className={`w-full flex flex-col items-center justify-center p-6 ${
                theme === "dark" ? "bg-[#2B2442] text-[#E2DDFE]" : "bg-[#F5F5F5] text-[#333333]"
            }`}
        >
            <Text className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
                Vos publications
            </Text>

            {isCreating ? (
                <Box className={`w-full max-w-2xl p-6 rounded-xl shadow-lg ${
                    theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
                }`}>
                    <Text className="text-xl font-bold mb-6 text-center">
                        Créer une nouvelle publication
                    </Text>
                    <Flex direction="column" gap="4">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Type <span className="text-red-500">*</span>
                            </Text>
                            <MySelect
                                options={["tutos", "cours", "tdtp", "examens", "livres"]}
                                label="Sélectionnez le type"
                                value={formData.type}
                                theme={theme}
                                onChange={(value) => handleChange("type", value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {formData.type === "tutos" ? "Nom" : "Titre"} <span className="text-red-500">*</span>
                            </Text>
                            <TextField.Root
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder={formData.type === "tutos" ? "Entrez le nom du tutoriel" : "Entrez le titre du document"}
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                            {errors.title && (
                                <Callout.Root color="red" size="1" mt="2">
                                    <Callout.Icon>
                                        <InfoIcon />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.title}</Callout.Text>
                                </Callout.Root>
                            )}
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Domaine <span className="text-red-500">*</span>
                            </Text>
                            <TextField.Root
                                value={formData.domaine}
                                onChange={(e) => handleChange("domaine", e.target.value)}
                                placeholder="Entrez le domaine (ex: Informatique, Mathématiques)"
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                            {errors.domaine && (
                                <Callout.Root color="red" size="1" mt="2">
                                    <Callout.Icon>
                                        <InfoIcon />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.domaine}</Callout.Text>
                                </Callout.Root>
                            )}
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description <span className="text-red-500">*</span>
                            </Text>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Fournissez une description détaillée de la publication"
                                rows={4}
                                className={`w-full p-3 rounded-md ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                            {errors.description && (
                                <Callout.Root color="red" size="1" mt="2">
                                    <Callout.Icon>
                                        <InfoIcon />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.description}</Callout.Text>
                                </Callout.Root>
                            )}
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Classe <span className="text-red-500">*</span>
                            </Text>
                            <MySelect
                                options={["isi", "rt", "gl"]}
                                label="Sélectionnez la classe"
                                value={formData.classe}
                                onChange={(value) => handleChange("classe", value)}
                            />
                            {errors.classe && (
                                <Callout.Root color="red" size="1" mt="2">
                                    <Callout.Icon>
                                        <InfoIcon />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.classe}</Callout.Text>
                                </Callout.Root>
                            )}
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Source <span className="text-red-500">*</span>
                            </Text>
                            <input
                                type="file"
                                accept={fileAccept}
                                onChange={handleFileChange}
                                className={`w-full p-3 rounded-md border ${
                                    theme === "dark"
                                        ? "bg-[#291F43] text-[#E2DDFE] border-gray-600 placeholder-gray-400"
                                        : "bg-[#FFFFFF] text-[#333333] border-gray-300 placeholder-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                            />
                            {errors.source && (
                                <Callout.Root color="red" size="1" mt="2">
                                    <Callout.Icon>
                                        <InfoIcon />
                                    </Callout.Icon>
                                    <Callout.Text>{errors.source}</Callout.Text>
                                </Callout.Root>
                            )}
                        </label>
                    </Flex>
                    <Flex gap="3" mt="6" justify="end">
                        <Button
                            variant="soft"
                            color="gray"
                            onClick={handleCreateToggle}
                            className={`px-6 py-2 rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-600 text-[#E2DDFE] hover:bg-gray-500"
                                    : "bg-gray-200 text-[#333333] hover:bg-gray-300"
                            } transition`}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className={`px-6 py-2 rounded-md ${
                                theme === "dark"
                                    ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                    : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                            } text-[#FFFFFF] transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Publier
                        </Button>
                    </Flex>
                </Box>
            ) : (
                <>
                    {allPublications.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <Text className="text-base opacity-80 text-center">
                                Vous n’avez pas encore de publication
                            </Text>
                            <Button
                                onClick={handleCreateToggle}
                                className={`w-full lg:w-auto flex items-center justify-center gap-2 ${
                                    theme === "dark"
                                        ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                        : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                                } px-5 py-2 rounded-md text-white cursor-pointer transition text-base`}
                            >
                                <Upload size={16} />
                                Publier maintenant
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-8">
                            {["tutos", "cours", "tdtp", "examens", "livres"].map((category) => (
                                userPublications[category].length > 0 && (
                                    <Box key={category} className="flex flex-col gap-4">
                                        <Text className="text-xl font-bold capitalize">
                                            {category === "tdtp" ? "TD & TP" : category}
                                        </Text>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"> {/* Changé à lg:grid-cols-2 pour 1/2 écran */}
                                            {category === "tutos"
                                                ? userPublications[category].map((proj) => (
                                                      <ProjetCard
                                                          key={proj.id}
                                                          projet={proj}
                                                          onClick={() =>
                                                              navigate("/bibliotheque", {
                                                                  state: { tutos: proj },
                                                              })
                                                          }
                                                      />
                                                  ))
                                                : userPublications[category].map((doc) => (
                                                      <Document
                                                          key={doc.id}
                                                          book={doc}
                                                          onClick={() =>
                                                              navigate("/bibliotheque", {
                                                                  state: { book: doc },
                                                              })
                                                          }
                                                      />
                                                  ))}
                                        </div>
                                    </Box>
                                )
                            ))}
                            <Button
                                onClick={handleCreateToggle}
                                className={`w-full lg:w-auto flex items-center justify-center gap-2 ${
                                    theme === "dark"
                                        ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                        : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                                } px-5 py-2 rounded-md text-white cursor-pointer transition text-base`}
                            >
                                <Upload size={16} />
                                Publier maintenant
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}