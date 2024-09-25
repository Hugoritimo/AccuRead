"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Função para adicionar o progresso visual
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
    <div
      className="bg-[#af1b1b] h-6 rounded-full text-center text-white"
      style={{ width: `${progress}%` }}
    >
      {progress}%
    </div>
  </div>
);

// Estado inicial do formulário
const initialState = {
  numeroRDO: "",
  dataRelatorio: null,
  empresa: "",
  cliente: "",
  localObra: "",
  gerencia: "",
  responsavelObra: "",
  tempoManha: "",
  tempoTarde: "",
  temperaturaManha: "",
  temperaturaTarde: "",
  umidadeManha: "",
  umidadeTarde: "",
  efetivo: [{ nome: "", cargo: "", horasTrabalhadas: "" }],
  equipamentos: [{ nome: "", quantidade: "", condicao: "" }],
  atividades: "",
  incidentes: "",
  checklistSeguranca: [false, false, false, false],
  fotosProgresso: [],
  observacoesFiscalizacao: "",
  observacoesContratada: "",
  assinaturas: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_ITEM":
      return {
        ...state,
        [action.field]: [...state[action.field], action.item],
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const RelatorioDiarioObras = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
    calculateProgress();
  };

  const handleDateChange = (date, name) => {
    dispatch({ type: "SET_FIELD", field: name, value: date });
    calculateProgress();
  };

  const handleAddItem = (field, item) => {
    dispatch({ type: "ADD_ITEM", field, item });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    handleAddItem("fotosProgresso", files);
  };

  const calculateProgress = () => {
    const filledFields = Object.values(state).filter(
      (value) => value !== "" && value !== null
    );
    const totalFields = Object.keys(state).length;
    setProgress((filledFields.length / totalFields) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pdfBlob = await generatePDF();
      const pdfDownloadUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfDownloadUrl);
      alert("PDF gerado com sucesso!");
      dispatch({ type: "RESET" });
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar PDF.");
    }
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Relatório Diário de Obras</h1>
          <p>Número RDO: ${state.numeroRDO}</p>
          <p>Data: ${state.dataRelatorio}</p>
          <p>Empresa: ${state.empresa}</p>
          <p>Cliente: ${state.cliente}</p>
          <p>Local da Obra: ${state.localObra}</p>
          <p>Gerência: ${state.gerencia}</p>
          <p>Responsável: ${state.responsavelObra}</p>
          <h3>Condições Climáticas</h3>
          <p>Manhã: ${state.tempoManha}, ${
      state.temperaturaManha
    }°C, Umidade: ${state.umidadeManha}%</p>
          <p>Tarde: ${state.tempoTarde}, ${
      state.temperaturaTarde
    }°C, Umidade: ${state.umidadeTarde}%</p>
          <h3>Efetivo</h3>
          <ul>${state.efetivo
            .map(
              (ef) =>
                `<li>${ef.nome}, Cargo: ${ef.cargo}, Horas Trabalhadas: ${ef.horasTrabalhadas}</li>`
            )
            .join("")}</ul>
          <h3>Equipamentos</h3>
          <ul>${state.equipamentos
            .map(
              (equip) =>
                `<li>${equip.nome}, Quantidade: ${equip.quantidade}, Condição: ${equip.condicao}</li>`
            )
            .join("")}</ul>
          <h3>Atividades</h3>
          <p>${state.atividades}</p>
          <h3>Incidentes</h3>
          <p>${state.incidentes}</p>
          <h3>Checklist de Segurança</h3>
          <p>${state.checklistSeguranca.join(", ")}</p>
          <h3>Observações da Fiscalização</h3>
          <p>${state.observacoesFiscalizacao}</p>
          <h3>Observações da Contratada</h3>
          <p>${state.observacoesContratada}</p>
          <h3>Assinaturas</h3>
          <p>${state.assinaturas}</p>
        </body>
      </html>
    `;

    const response = await axios.post(
      "http://localhost:3001/pdfgenerator/generate",
      { htmlContent },
      { responseType: "blob" }
    );

    return new Blob([response.data], { type: "application/pdf" });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Relatório Diário de Obras</h1>

        {/* Progresso */}
        <ProgressBar progress={progress} />

        {/* Dados Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Número do RDO"
            name="numeroRDO"
            value={state.numeroRDO}
            onChange={handleChange}
            required
          />
          <DatePickerField
            label="Data"
            selected={state.dataRelatorio}
            onChange={(date) => handleDateChange(date, "dataRelatorio")}
            required
          />
          <InputField
            label="Empresa"
            name="empresa"
            value={state.empresa}
            onChange={handleChange}
            required
          />
          <InputField
            label="Cliente"
            name="cliente"
            value={state.cliente}
            onChange={handleChange}
            required
          />
          <InputField
            label="Local da Obra"
            name="localObra"
            value={state.localObra}
            onChange={handleChange}
            required
          />
          <InputField
            label="Gerência"
            name="gerencia"
            value={state.gerencia}
            onChange={handleChange}
            required
          />
          <InputField
            label="Responsável pela Obra"
            name="responsavelObra"
            value={state.responsavelObra}
            onChange={handleChange}
            required
          />
        </div>

        {/* Condições Climáticas */}
        <h3 className="text-lg font-semibold mt-8">Condições Climáticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Tempo Manhã"
            name="tempoManha"
            value={state.tempoManha}
            onChange={handleChange}
          />
          <InputField
            label="Tempo Tarde"
            name="tempoTarde"
            value={state.tempoTarde}
            onChange={handleChange}
          />
          <InputField
            label="Temperatura Manhã"
            name="temperaturaManha"
            value={state.temperaturaManha}
            onChange={handleChange}
          />
          <InputField
            label="Temperatura Tarde"
            name="temperaturaTarde"
            value={state.temperaturaTarde}
            onChange={handleChange}
          />
          <InputField
            label="Umidade Manhã"
            name="umidadeManha"
            value={state.umidadeManha}
            onChange={handleChange}
          />
          <InputField
            label="Umidade Tarde"
            name="umidadeTarde"
            value={state.umidadeTarde}
            onChange={handleChange}
          />
        </div>

        {/* Efetivo */}
        <h3 className="text-lg font-semibold mt-8">Efetivo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nome do Trabalhador"
            name="efetivo"
            value=""
            onChange={(e) =>
              handleAddItem("efetivo", {
                nome: e.target.value,
                cargo: "",
                horasTrabalhadas: "",
              })
            }
          />
        </div>

        {/* Equipamentos */}
        <h3 className="text-lg font-semibold mt-8">Equipamentos Utilizados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nome do Equipamento"
            name="equipamentos"
            value=""
            onChange={(e) =>
              handleAddItem("equipamentos", {
                nome: e.target.value,
                quantidade: "1",
                condicao: "Bom",
              })
            }
          />
        </div>

        {/* Atividades do Dia */}
        <TextareaField
          label="Atividades Realizadas"
          name="atividades"
          value={state.atividades}
          onChange={handleChange}
        />

        {/* Incidentes e Segurança */}
        <TextareaField
          label="Incidentes ou Problemas"
          name="incidentes"
          value={state.incidentes}
          onChange={handleChange}
        />

        {/* Observações */}
        <TextareaField
          label="Observações da Fiscalização"
          name="observacoesFiscalizacao"
          value={state.observacoesFiscalizacao}
          onChange={handleChange}
        />
        <TextareaField
          label="Observações da Contratada"
          name="observacoesContratada"
          value={state.observacoesContratada}
          onChange={handleChange}
        />

        {/* Botões */}
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Gerar PDF
          </button>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Baixar PDF
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

// Componentes Auxiliares
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded mt-2"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded mt-2"
    ></textarea>
  </div>
);

const DatePickerField = ({ label, selected, onChange }) => (
  <div>
    <label className="block text-sm font-semibold">{label}</label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      className="w-full p-2 border border-gray-300 rounded mt-2"
    />
  </div>
);

export default RelatorioDiarioObras;
