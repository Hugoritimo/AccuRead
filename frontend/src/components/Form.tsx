"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

const Form = () => {
  const [numeroContrato, setNumeroContrato] = useState("");
  const [nomeObra, setNomeObra] = useState("");
  const [cliente, setCliente] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      numero_contrato: numeroContrato,
      nome_obra: nomeObra,
      cliente: cliente,
    };
    try {
      const response = await axios.post(
        "http://localhost:3333/contracts",
        data
      );
      console.log("Contrato criado:", response.data);
    } catch (error) {
      console.error("Erro ao criar contrato:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-4">
            <img
              src="/path/to/logo.png"
              alt="Projeta Engenharia"
              className="w-12 h-12 mr-4"
            />
            <CardTitle>Projeta Engenharia</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Número do Contrato
              </label>
              <input
                type="text"
                placeholder="Digite o número do contrato"
                className="mb-4 w-full p-2 border border-gray-300 rounded"
                value={numeroContrato}
                onChange={(e) => setNumeroContrato(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Nome da Obra
              </label>
              <input
                type="text"
                placeholder="Digite o nome da obra"
                className="mb-4 w-full p-2 border border-gray-300 rounded"
                value={nomeObra}
                onChange={(e) => setNomeObra(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Cliente</label>
              <input
                type="text"
                placeholder="Digite o nome do cliente"
                className="mb-4 w-full p-2 border border-gray-300 rounded"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-4">
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
