import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define a interface para os dados do formulário
interface FormData {
  numeroContrato: string;
  nomeObra: string;
  cliente: string;
  data: string;
  horasTrabalhadas: string;
  tempoManha: string;
  tempoTarde: string;
  observacoesFiscalizacao: string;
  observacoesContratada: string;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
  },
  image: {
    width: 100,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  signature: {
    marginTop: 50,
    fontSize: 12,
    textAlign: "center",
  },
});

// Create Document Component
const RelatorioPDF: React.FC<{ formData: FormData }> = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.image} src="https://example.com/img/projeta.png" />
        <Text style={styles.title}>Relatório Diário de Obras</Text>
        <Text style={styles.header}>Dados da Obra</Text>
        <Text style={styles.text}>
          Número do Contrato: {formData.numeroContrato || "N/A"}
        </Text>
        <Text style={styles.text}>
          Nome da Obra: {formData.nomeObra || "N/A"}
        </Text>
        <Text style={styles.text}>Cliente: {formData.cliente || "N/A"}</Text>
        <Text style={styles.text}>Data: {formData.data || "N/A"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Detalhes do Trabalho</Text>
        <Text style={styles.text}>
          Horas Trabalhadas: {formData.horasTrabalhadas || "N/A"}
        </Text>
        <Text style={styles.text}>
          Tempo pela Manhã: {formData.tempoManha || "N/A"}
        </Text>
        <Text style={styles.text}>
          Tempo pela Tarde: {formData.tempoTarde || "N/A"}
        </Text>
        <Text style={styles.text}>
          Observações da Fiscalização:{" "}
          {formData.observacoesFiscalizacao || "N/A"}
        </Text>
        <Text style={styles.text}>
          Observações da Contratada: {formData.observacoesContratada || "N/A"}
        </Text>
      </View>
      <View style={styles.signature}>
        <Text>___________________________________</Text>
        <Text>Assinatura</Text>
      </View>
    </Page>
  </Document>
);

export default RelatorioPDF;
