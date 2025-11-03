// src/components/Footer.jsx
import { Box, Text, Flex, Link } from "@radix-ui/themes";
import { useAppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  BookOpen,
  Heart,
  Coffee,
} from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@eduplateforme.com", label: "Email" },
  { icon: Globe, href: "https://eduplateforme.com", label: "Site web" },
];

const quickLinks = [
  { name: "Accueil", href: "/home" },
  { name: "Bibliothèque", href: "/bibliotheque" },
  { name: "Portail", href: "/portail" },
  { name: "Favoris", href: "/favoris" }
];

export function Footer() {
  const { theme, handlePageChange } = useAppContext();
  const Navigate = useNavigate();

  return (
    <Box
      as="footer"
      className={`w-full mt-auto border-t ${
        theme === "dark"
          ? "bg-[#291F43] border-[#3C2E69]"
          : "bg-white border-[#D1D5DB]"
      }`}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          justify="between"
          align={{ initial: "center", sm: "start" }}
          gap={{ initial: "8", sm: "12" }}
          className="text-center sm:text-left"
        >
          {/* Logo & Description */}
          <Box className="flex-1 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Text
                size="5"
                weight="bold"
                className="bg-gradient-to-r from-[#1F6692] to-[#58D5BA] bg-clip-text text-transparent"
              >
                Renouveau
              </Text>
              <Text
                className={`mt-3 block text-sm ${
                  theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                } opacity-80`}
              >
                La plateforme collaborative des étudiants de l’ESI/UNB. Partage,
                découvre et excelle.
              </Text>

              {/* Mini-stats */}
              <Flex gap="4" mt="4" justify="center" className="sm:justify-start">
                <Flex direction="column" align="center" gap="1">
                  <Text size="4" weight="bold" className="text-[#58D5BA]">
                    2.4k
                  </Text>
                  <Text size="1" className="opacity-70">
                    Documents
                  </Text>
                </Flex>
                <Flex direction="column" align="center" gap="1">
                  <Text size="4" weight="bold" className="text-[#5472E4]">
                    180
                  </Text>
                  <Text size="1" className="opacity-70">
                    Projets
                  </Text>
                </Flex>
                <Flex direction="column" align="center" gap="1">
                  <Text size="4" weight="bold" className="text-[#7AA2FF]">
                    850
                  </Text>
                  <Text size="1" className="opacity-70">
                    Étudiants
                  </Text>
                </Flex>
              </Flex>
            </motion.div>
          </Box>

          {/* Quick Links */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Text size="3" weight="bold" className="mb-4 text-[#58D5BA]">
                Accès rapide
              </Text>
              <Flex direction="column" gap="2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href="#"
                    onClick={()=>{
                      Navigate(link.href);
                      handlePageChange(link.name);
                    }}
                    className={`text-sm transition hover:text-[#58D5BA] ${
                      theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </Flex>
            </motion.div>
          </Box>

          {/* Social Icons */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Text size="3" weight="bold" className="mb-4 text-[#58D5BA]">
                Rejoins-nous
              </Text>
              <Flex gap="3" justify="center" className="sm:justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-full transition ${
                        theme === "dark"
                          ? "bg-[#3C2E69] hover:bg-[#5472E4]"
                          : "bg-[#E0E0E0] hover:bg-[#4B6ACF]"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
                        }
                      />
                    </motion.a>
                  );
                })}
              </Flex>
            </motion.div>
          </Box>
        </Flex>

        {/* Bottom Bar */}
        <Box className="mt-10 pt-6 border-t border-opacity-30">
          <Flex
            direction={{ initial: "column", sm: "row" }}
            justify="between"
            align="center"
            gap="4"
          >
            <Text
              size="2"
              className={`${
                theme === "dark" ? "text-[#E2DDFE]" : "text-[#333333]"
              } opacity-70`}
            >
              © {new Date().getFullYear()} Renouveau. Tous droits réservés.
            </Text>

            <Flex align="center" gap="2">
              <Text size="2" className="opacity-70">
                Fait avec
              </Text>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart size={16} className="text-red-500 fill-red-500" />
              </motion.div>
              <Text size="2" className="opacity-70">
                et
              </Text>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Coffee size={16} className="text-[#58D5BA]" />
              </motion.div>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}