"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaIndustry, FaBuilding } from "react-icons/fa";
import { FaChessPawn } from "react-icons/fa";

const SelectionButton = ({
  company,
  icon: Icon,
  label,
  gradientFrom,
  gradientTo,
  onSelect,
}) => (
  <motion.div
    className="flex flex-col items-center justify-center p-6 bg-white text-[#333333] rounded-lg shadow-md cursor-pointer hover:shadow-lg"
    onClick={() => onSelect(company)}
    role="button"
    aria-label={`Selecionar ${label}`}
    style={{
      backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      border: "1px solid rgba(0, 0, 0, 0.1)",
      height: "140px",
      width: "100%",
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon size={48} className="mb-2 text-white" />
    <span className="mt-2 text-lg font-semibold text-white">{label}</span>
  </motion.div>
);

const SelectPage = () => {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleSelect = (company: string) => {
    setSelectedCompany(company);
    localStorage.setItem("selectedCompany", company); // Armazena a empresa selecionada
    router.push("/form"); // Redireciona para a página do formulário
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-[#af1b1b] mb-8">
              Selecione a Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 gap-6">
              <SelectionButton
                company="vale"
                icon={FaIndustry}
                label="Vale"
                gradientFrom="#af1b1b"
                gradientTo="#cc1f1f"
                onSelect={handleSelect}
              />
              <SelectionButton
                company="alumar"
                icon={FaBuilding}
                label="Alumar"
                gradientFrom="#af1b1b"
                gradientTo="#cc1f1f"
                onSelect={handleSelect}
              />
              <SelectionButton
                company="projeta"
                icon={FaChessPawn} // Alterado para o ícone de pião de xadrez
                label="Projeta"
                gradientFrom="#af1b1b"
                gradientTo="#cc1f1f"
                onSelect={handleSelect}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SelectPage;
