import { Dialog, Button, Flex, TextField, Text, Select, TextArea } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { useState } from "react";
import { TrashIcon, Edit2 } from "lucide-react";

function MySelect({ options, label, value, onChange }) {
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger />
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

export function EditProfil() {
    const { user, setUser, theme } = useAppContext();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        formation: user.formation || "Licence 3 * Informatique * ESI/UNB",
        description: user.description,
        competences: user.competences.join(", "),
        parcours: user.parcours,
    });
    const [newParcours, setNewParcours] = useState({
        annee: "",
        niveau: "",
        filiere: "",
        etablissement: "",
        statut: "termine",
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleParcoursChange = (field, value) => {
        setNewParcours((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddParcours = () => {
        if (newParcours.annee && newParcours.niveau && newParcours.filiere && newParcours.etablissement) {
            setFormData((prev) => ({
                ...prev,
                parcours: editingIndex !== null
                    ? prev.parcours.map((entry, index) =>
                          index === editingIndex ? newParcours : entry
                      )
                    : [...prev.parcours, newParcours],
            }));
            setNewParcours({ annee: "", niveau: "", filiere: "", etablissement: "", statut: "termine" });
            setEditingIndex(null);
        }
    };

    const handleEditParcours = (index) => {
        setEditingIndex(index);
        setNewParcours(formData.parcours[index]);
    };

    const handleDeleteParcours = (index) => {
        setFormData((prev) => ({
            ...prev,
            parcours: prev.parcours.filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        // Parse formation string to update the latest parcours entry
        const [niveau, filiere, etablissement] = formData.formation
            .split(" * ")
            .map((part) => part.trim());
        const updatedParcours = formData.parcours.length > 0
            ? formData.parcours.map((entry, index) =>
                  index === formData.parcours.length - 1
                      ? { ...entry, niveau, filiere, etablissement }
                      : entry
              )
            : [
                  {
                      annee: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
                      niveau,
                      filiere,
                      etablissement,
                      statut: "encours",
                  },
              ];

        const updatedUser = {
            ...user,
            name: formData.name,
            email: formData.email,
            formation: formData.formation,
            description: formData.description,
            competences: formData.competences.split(",").map((comp) => comp.trim()).filter(Boolean),
            parcours: updatedParcours,
        };
        setUser(updatedUser);
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    className={`${
                        theme === "dark" ? "bg-[#5472E4] text-[#E2DDFE]" : "bg-[#4B6ACF] text-[#FFFFFF]"
                    } px-4 py-2 rounded-md cursor-pointer`}
                >
                    Modifier mes informations
                </Button>
            </Dialog.Trigger>

            <Dialog.Content
                maxWidth="450px"
                className={`${theme === "dark" ? "bg-[#3C2E69] text-[#E2DDFE]" : "bg-[#E0E0E0] text-[#333333]"} p-6`}
            >
                <Dialog.Title className="text-xl font-bold mb-4">Modifier mes informations</Dialog.Title>
                <Dialog.Description size="2" mb="4" className="text-base opacity-80">
                    Changement des informations de votre profil
                </Dialog.Description>

                <Flex direction="column" gap="4">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Nom
                        </Text>
                        <TextField.Root
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Root
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Formation
                        </Text>
                        <TextField.Root
                            value={formData.formation}
                            onChange={(e) => handleChange("formation", e.target.value)}
                            placeholder="Ex: Licence 3 * Informatique * ESI/UNB"
                            className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextArea
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Décrivez-vous..."
                            className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Compétences (séparées par des virgules)
                        </Text>
                        <TextField.Root
                            value={formData.competences}
                            onChange={(e) => handleChange("competences", e.target.value)}
                            placeholder="Ex: React, Node.js, SQL"
                            className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                        />
                    </label>
                    <label className="space-y-4">
                        <Text as="div" size="2" mb="1" weight="bold">
                            Parcours actuels
                        </Text>
                        <div className="space-y-3">
                            {formData.parcours.map((entry, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-md ${
                                        theme === "dark" ? "bg-[#4C4377]" : "bg-[#D1D5DB]"
                                    }`}
                                >
                                    <Text size="2">
                                        {entry.annee} - {entry.niveau} - {entry.filiere} - {entry.etablissement} ({entry.statut})
                                    </Text>
                                    <Flex gap="2">
                                        <Button
                                            size="1"
                                            variant="soft"
                                            onClick={() => handleEditParcours(index)}
                                            className="cursor-pointer"
                                        >
                                            <Edit2 size={14} />
                                        </Button>
                                        <Button
                                            size="1"
                                            variant="soft"
                                            color="red"
                                            onClick={() => handleDeleteParcours(index)}
                                            className="cursor-pointer"
                                        >
                                            <TrashIcon size={14} />
                                        </Button>
                                    </Flex>
                                </div>
                            ))}
                        </div>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Ajouter/Modifier un parcours
                        </Text>
                        <Flex direction="column" gap="2">
                            <TextField.Root
                                value={newParcours.annee}
                                onChange={(e) => handleParcoursChange("annee", e.target.value)}
                                placeholder="Année (ex: 2023-2024)"
                                className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                            />
                            <MySelect
                                options={["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"]}
                                label="Niveau"
                                value={newParcours.niveau}
                                onChange={(value) => handleParcoursChange("niveau", value)}
                            />
                            <MySelect
                                options={["Informatique", "MPCI"]}
                                label="Filière"
                                value={newParcours.filiere}
                                onChange={(value) => handleParcoursChange("filiere", value)}
                            />
                            <TextField.Root
                                value={newParcours.etablissement}
                                onChange={(e) => handleParcoursChange("etablissement", e.target.value)}
                                placeholder="Établissement (ex: ESI/UNB)"
                                className={`${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-[#FFFFFF] text-[#333333]"}`}
                            />
                            <MySelect
                                options={["termine", "encours"]}
                                label="Statut"
                                value={newParcours.statut}
                                onChange={(value) => handleParcoursChange("statut", value)}
                            />
                            <Button
                                onClick={handleAddParcours}
                                disabled={!newParcours.annee || !newParcours.niveau || !newParcours.filiere || !newParcours.etablissement}
                                className={`${theme === "dark" ? "bg-[#5472E4]" : "bg-[#4B6ACF]"} text-[#FFFFFF]`}
                            >
                                {editingIndex !== null ? "Modifier" : "Ajouter"}
                            </Button>
                        </Flex>
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Annuler
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleSave}>Enregistrer</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}