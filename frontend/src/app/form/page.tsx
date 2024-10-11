"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Barra de Progresso personalizada
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
    <div
      className="bg-[#af1b1b] h-6 rounded-full text-center text-white text-sm"
      style={{ width: `${progress}%` }}
    >
      {progress}%
    </div>
  </div>
);

// Estado inicial do formulário
const initialState = {
  numeroRDO: "",
  dataRelatorio: null as Date | null,
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
  fotosProgresso: [] as File[],
  observacoesFiscalizacao: "",
  observacoesContratada: "",
  assinaturas: "",
};

type FormState = typeof initialState;

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: any }
  | { type: "ADD_ITEM"; field: keyof FormState; item: any }
  | { type: "RESET" };

// Redutor para gerenciamento do estado
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_ITEM":
      return {
        ...state,
        [action.field]: [...(state[action.field] as any[]), action.item],
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

  // Corrigido handleChange para lidar com múltiplos tipos de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name as keyof FormState, value });
    calculateProgress();
  };

  const handleDateChange = (date: Date | null, name: keyof FormState) => {
    dispatch({ type: "SET_FIELD", field: name, value: date });
    calculateProgress();
  };

  const handleAddItem = (field: keyof FormState, item: any) => {
    dispatch({ type: "ADD_ITEM", field, item });
  };

  const calculateProgress = () => {
    const filledFields = Object.values(state).filter(
      (value) => value !== "" && value !== null
    );
    const totalFields = Object.keys(state).length;
    setProgress((filledFields.length / totalFields) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-[#af1b1b] mb-6">
          Relatório Diário de Obras
        </h1>

        {/* Progresso */}
        <ProgressBar progress={progress} />

        {/* Dados Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Número do RDO"
            name="numeroRDO"
            value={state.numeroRDO}
            onChange={handleChange}
          />
          <DatePickerField
            label="Data"
            selected={state.dataRelatorio}
            onChange={(date) => handleDateChange(date, "dataRelatorio")}
          />
          <InputField
            label="Empresa"
            name="empresa"
            value={state.empresa}
            onChange={handleChange}
          />
          <InputField
            label="Cliente"
            name="cliente"
            value={state.cliente}
            onChange={handleChange}
          />
          <InputField
            label="Local da Obra"
            name="localObra"
            value={state.localObra}
            onChange={handleChange}
          />
          <InputField
            label="Gerência"
            name="gerencia"
            value={state.gerencia}
            onChange={handleChange}
          />
          <InputField
            label="Responsável pela Obra"
            name="responsavelObra"
            value={state.responsavelObra}
            onChange={handleChange}
          />
        </div>

        {/* Outros campos... */}
      </form>
    </div>
  );
};

// Componentes Auxiliares
type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
    />
  </div>
);

type TextareaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
    ></textarea>
  </div>
);

type DatePickerFieldProps = {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  selected,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
    />
  </div>
);

export default RelatorioDiarioObras;
