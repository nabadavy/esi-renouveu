import { Box, Text, TextArea, Heading } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";

export function DocInfo({ book }) {
  const { theme } = useAppContext();

  const handleDownload = () => {
    if (book?.fileUrl) {
      const link = document.createElement("a");
      link.href = book.fileUrl;
      link.download = book.title || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No file available for download.");
    }
  };

  const infoItems = [
    { label: "Auteur", value: book?.auteur || "COMPAORE Salomon" },
    { label: "Description", value: book?.description || "Lorem ipsum dolor sit amet..." },
    { label: "Classe", value: book?.classe || "ISI" },
    { label: "Année", value: book?.annee || "2024" },
  ];

  return (
    <Box
      className={`w-full max-w-4xl mx-auto rounded-xl p-6 shadow-xl ${
        theme === "dark" ? "bg-[#56468B]" : "bg-[#D1D5DB]"
      }`}
    >
      <Heading
        className={`text-center text-2xl sm:text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-[#58D5BA]" : "text-[#1F6692]"
        }`}
      >
        {book?.title || "Titre"}
      </Heading>

      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4">
            <Text className="font-bold text-sm sm:text-base mb-2 sm:mb-0">{item.label}</Text>
            <Text className={`${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} text-sm sm:text-base`}>
              {item.value}
            </Text>
          </div>
        ))}

        {/* Commentaire */}
        <div className="flex flex-col border-b pb-4">
          <Text className="font-bold text-sm sm:text-base mb-2">Commentaire</Text>
          <TextArea
            placeholder="Envoyer un commentaire…"
            className={`w-full resize-none ${theme === "dark" ? "bg-[#291F43] text-[#E2DDFE]" : "bg-white text-[#333333]"}`}
          />
          <button
            className={`self-end mt-4 px-6 py-2 rounded-lg font-bold ${
              theme === "dark" ? "bg-[#5472E4] text-white" : "bg-[#1F6692] text-white"
            }`}
          >
            Envoyer
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className={`px-8 py-3 rounded-lg font-bold ${
              theme === "dark" ? "bg-gray-900 text-[#E2DDFE]" : "bg-[#333333] text-white"
            }`}
          >
            Télécharger
          </button>
          <button
            className={`px-8 py-3 rounded-lg font-bold ${
              theme === "dark" ? "bg-[#58D5BA] text-[#291F43]" : "bg-[#1F6692] text-white"
            }`}
          >
            Lire en ligne
          </button>
        </div>
      </div>
    </Box>
  );
}