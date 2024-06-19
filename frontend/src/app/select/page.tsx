"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaIndustry, FaBuilding } from "react-icons/fa";

const SelectPage = () => {
  const router = useRouter();

  const handleSelect = (company) => {
    router.push(`/form?company=${company}`);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-4">
            Selecione a Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-8 text-gray-700">
            Por favor, selecione a empresa para a qual você deseja preencher o
            relatório diário de obra. Clique no botão correspondente abaixo.
          </p>
          <div className="flex justify-center gap-8">
            <div
              className="selection-button flex flex-col items-center justify-center p-6 bg-blue-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300"
              onClick={() => handleSelect("vale")}
            >
              <FaIndustry size={48} />
              <span className="mt-4 text-lg font-semibold">Vale</span>
            </div>
            <div
              className="selection-button flex flex-col items-center justify-center p-6 bg-green-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-green-700 transition duration-300"
              onClick={() => handleSelect("alumar")}
            >
              <FaBuilding size={48} />
              <span className="mt-4 text-lg font-semibold">Alumar</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectPage;
