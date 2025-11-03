import { useAppContext } from "/src/context/AppContext";

export function Logo() {
  const { theme } = useAppContext();

  return (
    <div className="flex flex-col w-24 sm:w-30 h-full gap-y-0">
      <div className={`first-ph ${theme === "dark" ? "text-[#9EB1FF]" : "text-[#4B6ACF]"} font-bold text-xl sm:text-2xl italic`}>
        ESI
      </div>
      <div className={`second-ph ${theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"} font-bold text-base sm:text-lg italic`}>
        Renouveau
      </div>
    </div>
  );
}