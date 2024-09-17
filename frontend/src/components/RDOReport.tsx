import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface FormData {
  numeroContrato: string;
  nomeObra: string;
  cliente: string;
  data: string;
  atividadesDiarias: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
  qtdEfetivo: string;
  qtdEquipamentos: string;
  qtdFerramentas: string;
  condicoesMeteorologicas: string;
  regimeTrabalho: string;
  gerente: string;
  responsavel: string;
  engenheiro: string;
  especialista: string;
  consultor: string;
  projetista: string;
  cadista: string;
  encarregado: string;
  topografo: string;
  sondador: string;
  pedreiro: string;
  tecnicoSeguranca: string;
  auxiliar: string;
  eletricista: string;
  instalador: string;
  ajudante: string;
  filePreviews: string[];
}

interface RDOReportProps {
  formData: FormData;
}

const RDOReport: React.FC<RDOReportProps> = ({ formData }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <Image src="/img/projeta.png" style={styles.logo} />
          <Text style={styles.title}>Relatório Diário de Obras</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Informações Gerais</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Contrato:</Text>
            <Text style={styles.value}>{formData.numeroContrato}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nome da Obra:</Text>
            <Text style={styles.value}>{formData.nomeObra}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.value}>{formData.cliente}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>
              {new Date(formData.data).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Atividades</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Atividades Diárias:</Text>
            <Text style={styles.value}>{formData.atividadesDiarias}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Observações da Fiscalização:</Text>
            <Text style={styles.value}>{formData.observacoesFiscalizacao}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Observações da Contratada:</Text>
            <Text style={styles.value}>{formData.observacoesContratada}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Equipe e Responsáveis</Text>
          {renderTeam(formData)}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Equipamentos e Ferramentas</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Quantidade de Efetivo:</Text>
            <Text style={styles.value}>{formData.qtdEfetivo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Quantidade de Equipamentos:</Text>
            <Text style={styles.value}>{formData.qtdEquipamentos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Quantidade de Ferramentas:</Text>
            <Text style={styles.value}>{formData.qtdFerramentas}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Condições e Regime</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Condições Meteorológicas:</Text>
            <Text style={styles.value}>{formData.condicoesMeteorologicas}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Regime de Trabalho:</Text>
            <Text style={styles.value}>{formData.regimeTrabalho}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Fotos</Text>
          <View style={styles.imageGrid}>
            {formData.filePreviews.map((preview, index) => (
              <Image
                key={index}
                src={preview}
                style={styles.image}
                alt={`Imagem ${index + 1}`}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Projeta Engenharia</Text>
        </View>
      </Page>
    </Document>
  );
};

const renderTeam = (formData: FormData) => {
  const teamMembers = [
    { label: "Gerente", value: formData.gerente },
    { label: "Responsável", value: formData.responsavel },
    { label: "Engenheiro", value: formData.engenheiro },
    { label: "Especialista", value: formData.especialista },
    { label: "Consultor", value: formData.consultor },
    { label: "Projetista", value: formData.projetista },
    { label: "Cadista", value: formData.cadista },
    { label: "Encarregado", value: formData.encarregado },
    { label: "Topógrafo", value: formData.topografo },
    { label: "Sondador", value: formData.sondador },
    { label: "Pedreiro", value: formData.pedreiro },
    { label: "Técnico de Segurança", value: formData.tecnicoSeguranca },
    { label: "Auxiliar", value: formData.auxiliar },
    { label: "Eletricista", value: formData.eletricista },
    { label: "Instalador", value: formData.instalador },
    { label: "Ajudante", value: formData.ajudante },
  ];

  return teamMembers.map((member, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.label}>{member.label}:</Text>
      <Text style={styles.value}>{member.value}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: "2px solid #af1b1b",
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#af1b1b",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #af1b1b",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#af1b1b",
    borderBottom: "1px solid #af1b1b",
    paddingBottom: 3,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    width: "40%",
  },
  value: {
    fontSize: 12,
    color: "#555",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
    color: "#af1b1b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  imageGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default RDOReport;
