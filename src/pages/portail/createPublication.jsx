import { Box, Text, Button, Flex, TextField, TextArea, Select } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { useState } from "react";
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

export function CreatePublication() {
    const { user, addPublication, theme } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "tutos",
        title: "",
        domaine: "",
        description: "",
        classe: "isi",
        source: null, // For file object
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const sourceUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, source: sourceUrl }));
        }
    };

    const handleSubmit = () => {
        const publication = {
            type: formData.type,
            [formData.type === "tutos" ? "name" : "title"]: formData.title,
            domaine: formData.domaine,
            description: formData.description,
            classe: formData.classe,
            [formData.type === "tutos" ? "url" : "file"]: formData.source,
        };
        addPublication(publication);
        navigate("/portail");
    };

    // Accept dynamique pour supporter MP4/VIDÉO quand type === "tutos"
    const fileAccept = formData.type === "tutos" ? "video/mp4,video/avi,video/*" : ".pdf,.doc,.docx";

    return (
        <Box
            className={`w-full min-h-screen flex flex-col items-center p-6 pt-16 ${
                theme === "dark" ? "bg-[#2B2442] text-[#E2DDFE]" : "bg-[#F5F5F5] text-[#333333]"
            }`}
        >
            <Text className="text-2xl lg:text-3xl flex mx-auto font-bold mb-6 text-center">
                Créer une nouvelle publication
            </Text>
            <Box className="w-full max-w-lg flex flex-col gap-4">
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Type
                        </Text>
                        <MySelect
                            options={["tutos", "cours", "tdtp", "examens", "livres"]}
                            label="Type"
                            value={formData.type}
                            theme={theme}
                            onChange={(value) => handleChange("type", value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            {formData.type === "tutos" ? "Nom" : "Titre"}
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
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Domaine
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
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextArea
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Entrez une description de la publication"
                            className={`w-full p-3 rounded-md ${
                                theme === "dark"
                                    ? "bg-[#291F43] text-[#E2DDFE] placeholder-gray-400"
                                    : "bg-[#FFFFFF] text-[#333333] placeholder-gray-600"
                            } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Classe
                        </Text>
                        <MySelect
                            options={["isi", "rt", "gl"]}
                            label="Classe"
                            value={formData.classe}
                            onChange={(value) => handleChange("classe", value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Source
                        </Text>
                        <input
                            type="file"
                            accept={fileAccept} // Accept dynamique pour MP4/vidéo
                            onChange={handleFileChange}
                            className={`w-full p-3 rounded-md border ${
                                theme === "dark"
                                    ? "bg-[#291F43] text-[#E2DDFE] border-gray-600 placeholder-gray-400"
                                    : "bg-[#FFFFFF] text-[#333333] border-gray-300 placeholder-gray-600"
                            } focus:outline-none focus:ring-2 focus:ring-[#58D5BA]`}
                        />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Button
                        variant="soft"
                        color="gray"
                        onClick={() => navigate("/portail")}
                        className={`px-4 py-2 rounded-md ${
                            theme === "dark"
                                ? "bg-gray-600 text-[#E2DDFE] hover:bg-gray-500"
                                : "bg-gray-200 text-[#333333] hover:bg-gray-300"
                        } transition`}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.domaine || !formData.classe || !formData.source}
                        className={`px-4 py-2 rounded-md ${
                            theme === "dark"
                                ? "bg-[#5472E4] hover:bg-[#4061C7]"
                                : "bg-[#4B6ACF] hover:bg-[#3A5AB0]"
                        } text-[#FFFFFF] transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        Publier
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}