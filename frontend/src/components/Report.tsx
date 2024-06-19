import React, { useEffect, useState } from "react";
import { Card } from "@shadcn/ui";
import axios from "axios";

const Report = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:3333/contracts");
        setContracts(response.data);
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      }
    };

    fetchContracts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Relatório de Contratos</h1>
        <ul>
          {contracts.map((contract) => (
            <li key={contract.id} className="mb-2">
              <strong>Número do Contrato:</strong> {contract.numero_contrato}
              <br />
              <strong>Nome da Obra:</strong> {contract.nome_obra}
              <br />
              <strong>Cliente:</strong> {contract.cliente}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Report;
