"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaBuilding,
  FaSun,
  FaCloud,
  FaTools,
  FaMapMarkerAlt,
  FaComment,
  FaCamera,
} from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RDOReport from "@/components/RDOReport";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormPage = () => {
  const [formData, setFormData] = useState({
    numeroContrato: "",
    nomeObra: "",
    cliente: "",
    dataInicio: "",
    dataTermino: "",
    horasTrabalhadas: "",
    tempoManha: "",
    tempoTarde: "",
    disciplina: "",
    localObra: "",
    horarioChegadaEquipe: "",
    horarioDDS: "",
    chegadaFiscal: "",
    nomeFiscal: "",
    liberacaoFrenteServico: "",
    inicioAtividades: "",
    almocoSaida: "",
    almocoRetorno: "",
    finalizacaoAtividades: "",
    saidaCanteiro: "",
    observacoes: "",
    fotos: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fotos") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fotos: [...prevFormData.fotos, ...files],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(formData).some(
        (value) => value === "" || value.length === 0
      )
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }
    toast.success("Enviado para Email");
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-4">
            <img src="/img/projeta.png" alt="Logo" className="w-12 h-12 mr-4" />
            <CardTitle className="text-2xl font-bold">
              Projeta Engenharia
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaBuilding className="inline mr-2" />
                  Número do Contrato
                </Label>
                <Input
                  type="text"
                  name="numeroContrato"
                  placeholder="Digite o número do contrato"
                  className="w-full"
                  value={formData.numeroContrato}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaBuilding className="inline mr-2" />
                  Nome da Obra
                </Label>
                <Input
                  type="text"
                  name="nomeObra"
                  placeholder="Digite o nome da obra"
                  className="w-full"
                  value={formData.nomeObra}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaUser className="inline mr-2" />
                  Cliente
                </Label>
                <Input
                  type="text"
                  name="cliente"
                  placeholder="Digite o nome do cliente"
                  className="w-full"
                  value={formData.cliente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaCalendarAlt className="inline mr-2" />
                  Data de Início da Obra
                </Label>
                <Input
                  type="date"
                  name="dataInicio"
                  className="w-full"
                  value={formData.dataInicio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaCalendarAlt className="inline mr-2" />
                  Data de Término da Obra
                </Label>
                <Input
                  type="date"
                  name="dataTermino"
                  className="w-full"
                  value={formData.dataTermino}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horas Trabalhadas Neste Dia
                </Label>
                <Input
                  type="number"
                  name="horasTrabalhadas"
                  placeholder="Digite as horas trabalhadas"
                  className="w-full"
                  value={formData.horasTrabalhadas}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaSun className="inline mr-2" />
                  Tempo pela Manhã
                </Label>
                <Select
                  name="tempoManha"
                  onValueChange={(value) =>
                    setFormData({ ...formData, tempoManha: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bom">Bom</SelectItem>
                    <SelectItem value="Chuvoso">Chuvoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaCloud className="inline mr-2" />
                  Tempo pela Tarde
                </Label>
                <Select
                  name="tempoTarde"
                  onValueChange={(value) =>
                    setFormData({ ...formData, tempoTarde: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bom">Bom</SelectItem>
                    <SelectItem value="Chuvoso">Chuvoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaTools className="inline mr-2" />
                  Disciplina
                </Label>
                <Input
                  type="text"
                  name="disciplina"
                  placeholder="Digite a disciplina"
                  className="w-full"
                  value={formData.disciplina}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Local da Obra
                </Label>
                <Input
                  type="text"
                  name="localObra"
                  placeholder="Digite o local da obra"
                  className="w-full"
                  value={formData.localObra}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Chegada da Equipe Projeta no Canteiro
                </Label>
                <Input
                  type="time"
                  name="horarioChegadaEquipe"
                  className="w-full"
                  value={formData.horarioChegadaEquipe}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Realização de DDS
                </Label>
                <Input
                  type="time"
                  name="horarioDDS"
                  className="w-full"
                  value={formData.horarioDDS}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Chegada do Fiscal na Frente de Serviço
                </Label>
                <Input
                  type="time"
                  name="chegadaFiscal"
                  className="w-full"
                  value={formData.chegadaFiscal}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaUser className="inline mr-2" />
                  Nome e Empresa do Fiscal
                </Label>
                <Input
                  type="text"
                  name="nomeFiscal"
                  placeholder="Digite o nome e empresa do fiscal"
                  className="w-full"
                  value={formData.nomeFiscal}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Liberação da Frente de Serviço
                </Label>
                <Input
                  type="time"
                  name="liberacaoFrenteServico"
                  className="w-full"
                  value={formData.liberacaoFrenteServico}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Início das Atividades
                </Label>
                <Input
                  type="time"
                  name="inicioAtividades"
                  className="w-full"
                  value={formData.inicioAtividades}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Almoço (Saída)
                </Label>
                <Input
                  type="time"
                  name="almocoSaida"
                  className="w-full"
                  value={formData.almocoSaida}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Almoço (Retorno)
                </Label>
                <Input
                  type="time"
                  name="almocoRetorno"
                  className="w-full"
                  value={formData.almocoRetorno}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Finalização das Atividades
                </Label>
                <Input
                  type="time"
                  name="finalizacaoAtividades"
                  className="w-full"
                  value={formData.finalizacaoAtividades}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  <FaClock className="inline mr-2" />
                  Horário de Saída do Canteiro
                </Label>
                <Input
                  type="time"
                  name="saidaCanteiro"
                  className="w-full"
                  value={formData.saidaCanteiro}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <Label className="block text-sm font-medium mb-1">
                <FaComment className="inline mr-2" />
                Observações
              </Label>
              <Textarea
                name="observacoes"
                placeholder="Digite suas observações"
                className="w-full"
                value={formData.observacoes}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label className="block text-sm font-medium mb-1">
                <FaCamera className="inline mr-2" />
                Relatório Fotográfico
              </Label>
              <Input
                type="file"
                name="fotos"
                accept="image/*"
                multiple
                className="hidden"
                id="file-input"
                onChange={handleChange}
              />
              <Button
                type="button"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
                onClick={() => document.getElementById("file-input").click()}
              >
                <FaCamera className="inline mr-2" />
                Adicionar Fotos
              </Button>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from(formData.fotos).map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Foto"
                      className="w-full h-32 object-cover rounded-md shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
            >
              Enviar
            </Button>
          </form>
          <div className="mt-4">
            <PDFDownloadLink
              document={<RDOReport formData={formData} />}
              fileName="relatorio-diario-obra.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Carregando documento..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormPage;
