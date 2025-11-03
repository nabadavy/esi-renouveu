import { Box, Text } from "@radix-ui/themes";
import { BookIcon } from "../../assets/icons/BookIcon";
import { TDIcon } from "../../assets/icons/TDIcon";
import { FolderIcon } from "../../assets/icons/FolderIcon";
import { useAppContext } from "/src/context/AppContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import de toutes les classes
import isi from "/src/data/isi.json";
import rt from "/src/data/rt.json";
import gl from "/src/data/gl.json";
import tc1 from "/src/data/tc1.json";
import tc2 from "/src/data/tc2.json";
import irs from "/src/data/irs.json";
import ds from "/src/data/ds.json";
import da from "/src/data/da.json";
import cs from "/src/data/cs.json";

const iconMap = { BookIcon, TDIcon, FolderIcon };
const allClasses = [isi, rt, gl, tc1, tc2, irs, ds, da, cs];

// Fonction utilitaire pour calculer les totaux globaux
function aggregateStats() {
  const result = {
    Cours: { icon: "BookIcon", contents: {} },
    "TD & TP": { icon: "TDIcon", contents: {} },
    Examens: { icon: "FolderIcon", contents: {} },
  };

  for (const cls of allClasses) {
    for (const section of cls.repertoires) {
      const key = section.header.name;
      if (result[key]) {
        for (const c of section.contents) {
          result[key].contents[c.name] =
            (result[key].contents[c.name] || 0) + c.count;
        }
      }
    }
  }

  // Conversion en tableau structuré compatible avec ton affichage actuel
  return Object.entries(result).map(([name, data]) => ({
    header: { name, icon: data.icon },
    contents: Object.entries(data.contents).map(([label, count]) => ({
      name: label,
      count,
    })),
  }));
}

const DisplayStat = ({ header, contents }) => {
  const { theme, handlePageChange, setActiveSection } = useAppContext();
  const navigate = useNavigate();
  const Icon = iconMap[header.icon];

  return (
    <Box
      className={`w-full max-w-sm p-6 rounded-xl shadow-2xl flex flex-col items-center ${
        theme === "dark" ? "bg-[#291f43]" : "bg-white"
      }`}
    >
      <Link
        to={`/bibliotheque?type=${header.name.toLowerCase()}`}
        onClick={() => {
          handlePageChange("Bibliotheque");
          setActiveSection(header.name);
        }}
      >
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-4 ${
            theme === "dark"
              ? "text-[#58D5BA] bg-[#3C2E69]"
              : "text-[#4B6ACF] bg-[#E0E0E0]"
          }`}
        >
          <Icon />
          <span>{header.name}</span>
        </div>
      </Link>

      <div className="w-full space-y-3">
        {contents?.length ? (
          contents.map((c, i) => (
            <div key={i}>
              {i > 0 && <hr className="border-[#58D5BA]/30" />}
              <Text
                className={`flex items-center justify-center gap-3 text-sm sm:text-base ${
                  theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                }`}
              >
                <span className="font-bold">+{c.count}</span>
                <span>{c.name}</span>
              </Text>
            </div>
          ))
        ) : (
          <Text className="text-center text-sm opacity-70">Aucune donnée</Text>
        )}
      </div>
    </Box>
  );
};

export function Repertories() {
  const { theme } = useAppContext();
  const stats = aggregateStats(); // utilise toutes les classes

  return (
    <section className="text-center space-y-8">
      <div className="flex gap-2 mx-auto justify-center items-center">
        <Text
          className={`font-bold text-2xl sm:text-3xl lg:text-4xl ${
            theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
          }`}
        >
          Profitez d'un vaste
        </Text>
        <Text className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent">
          Répertoire
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {stats.map((s, i) => (
          <DisplayStat key={i} header={s.header} contents={s.contents} />
        ))}
      </div>
    </section>
  );
}
