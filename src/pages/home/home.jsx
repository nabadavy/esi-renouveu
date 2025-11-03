import { Welcome } from "./welcom";
import { Repertories } from "./repertories";
import { News } from "./news";
import { Projets } from "./projets";
import { Box } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";

export function Home() {
  const { theme } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Welcome />
      <Box
        className={`flex-grow py-8 md:py-12 lg:py-16 ${
          theme === "dark" ? "bg-[#3C2E69]" : "bg-[#E0E0E0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <Repertories />
          <News />
          <Projets />
        </div>
      </Box>
    </div>
  );
}