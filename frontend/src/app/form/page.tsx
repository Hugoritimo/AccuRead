"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Componentes UI
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputField from "@/components/ui/InputField";
import TextareaField from "@/components/Textareafield";

// Tipos do estado e da ação
interface FormState {
  numeroRDO: string;
  gerencia: string;
  objeto: string;
  data: Date | null;
  contrato: string;
  obra: string;
  contratante: string;
  responsavel: string;
  dataInicioObra: Date | null;
  dataTerminoObra: Date | null;
  horasTrabalhadas: string;
  tempoManha: string;
  tempoTarde: string;
  disciplina: string;
  localObra: string;
  qtdEfetivo: string;
  qtdEquipamentos: string;
  atividadesDiarias: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
  anexos: File[];
}

interface FormAction {
  type: "SET_FIELD" | "ADD_ANEXOS" | "RESET";
  field?: string;
  value?: any;
  files?: File[];
}

// Estado inicial do formulário
const initialState: FormState = {
  numeroRDO: "",
  gerencia: "",
  objeto: "",
  data: null,
  contrato: "",
  obra: "",
  contratante: "",
  responsavel: "",
  dataInicioObra: null,
  dataTerminoObra: null,
  horasTrabalhadas: "",
  tempoManha: "",
  tempoTarde: "",
  disciplina: "",
  localObra: "",
  qtdEfetivo: "",
  qtdEquipamentos: "",
  atividadesDiarias: "",
  observacoesFiscalizacao: "",
  observacoesContratada: "",
  anexos: [],
};

// Função redutora para gerenciamento do estado do formulário
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field!]: action.value };
    case "ADD_ANEXOS":
      return {
        ...state,
        anexos: [...state.anexos, ...(action.files || [])],
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const FormPage: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleDateChange = (date: Date | null, name: string) => {
    dispatch({ type: "SET_FIELD", field: name, value: date });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const pdfBlob = await generatePDF();
      const pdfDownloadUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfDownloadUrl);
      toast.success("PDF gerado com sucesso!");
      dispatch({ type: "RESET" });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF, tente novamente.");
    }
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; }
            h1 { font-size: 18px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Relatório Diário de Obras</h1>
          <table>
            <tr><th>Número do RDO</th><td>${state.numeroRDO}</td></tr>
            <tr><th>Gerência</th><td>${state.gerencia}</td></tr>
            <tr><th>Objeto</th><td>${state.objeto}</td></tr>
            <tr><th>Data</th><td>${
              state.data ? state.data.toLocaleDateString() : "N/A"
            }</td></tr>
            <tr><th>Contrato</th><td>${state.contrato}</td></tr>
            <tr><th>Obra</th><td>${state.obra}</td></tr>
            <tr><th>Contratante</th><td>${state.contratante}</td></tr>
            <tr><th>Responsável</th><td>${state.responsavel}</td></tr>
            <tr><th>Data de Início da Obra</th><td>${
              state.dataInicioObra
                ? state.dataInicioObra.toLocaleDateString()
                : "N/A"
            }</td></tr>
            <tr><th>Data de Término da Obra</th><td>${
              state.dataTerminoObra
                ? state.dataTerminoObra.toLocaleDateString()
                : "N/A"
            }</td></tr>
            <tr><th>Horas Trabalhadas</th><td>${
              state.horasTrabalhadas
            }</td></tr>
            <tr><th>Disciplina</th><td>${state.disciplina}</td></tr>
            <tr><th>Atividades Diárias</th><td>${
              state.atividadesDiarias
            }</td></tr>
            <tr><th>Observações da Fiscalização</th><td>${
              state.observacoesFiscalizacao
            }</td></tr>
            <tr><th>Observações da Contratada</th><td>${
              state.observacoesContratada
            }</td></tr>
          </table>
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
    <TooltipProvider>
      <div className="container mx-auto p-4">
        <ToastContainer />
        <Card className="p-6 shadow-lg border border-gray-300 rounded-lg max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col items-center mb-4">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Relatório Diário de Obras
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <SectionTitle title="Informações Iniciais" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Número do RDO"
                  name="numeroRDO"
                  value={state.numeroRDO}
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
                  label="Objeto"
                  name="objeto"
                  value={state.objeto}
                  onChange={handleChange}
                  required
                />
                <DatePickerField
                  label="Data"
                  selected={state.data}
                  onChange={(date) => handleDateChange(date, "data")}
                  required
                />
                <InputField
                  label="Contrato"
                  name="contrato"
                  value={state.contrato}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Obra"
                  name="obra"
                  value={state.obra}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Contratante"
                  name="contratante"
                  value={state.contratante}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Responsável"
                  name="responsavel"
                  value={state.responsavel}
                  onChange={handleChange}
                  required
                />
              </div>

              <SectionTitle title="Efetivo e Equipamentos" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Quantidade de Efetivo"
                  name="qtdEfetivo"
                  value={state.qtdEfetivo}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Quantidade de Equipamentos"
                  name="qtdEquipamentos"
                  value={state.qtdEquipamentos}
                  onChange={handleChange}
                  required
                />
              </div>

              <SectionTitle title="Atividades Diárias e Observações" />
              <TextareaField
                label="Atividades Diárias"
                name="atividadesDiarias"
                value={state.atividadesDiarias}
                onChange={handleChange}
                required
              />
              <TextareaField
                label="Observações da Fiscalização"
                name="observacoesFiscalizacao"
                value={state.observacoesFiscalizacao}
                onChange={handleChange}
                required
              />
              <TextareaField
                label="Observações da Contratada"
                name="observacoesContratada"
                value={state.observacoesContratada}
                onChange={handleChange}
                required
              />

              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Gerar PDF
                </Button>
                {pdfUrl && (
                  <Button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(pdfUrl, "_blank")}
                  >
                    Baixar PDF
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

// Componentes Auxiliares
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">{title}</h2>
);

const DatePickerField: React.FC<{
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
}> = ({ label, selected, onChange, required = false }) => (
  <div className="flex flex-col">
    <Label>{label}</Label>
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      className="mt-2 p-2 border border-gray-300 rounded"
      placeholderText="Selecione a data"
      required={required}
    />
  </div>
);

export default FormPage;
