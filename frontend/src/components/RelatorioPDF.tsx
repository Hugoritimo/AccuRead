import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f2f2f2",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  signature: {
    marginTop: 50,
    fontSize: 12,
    textAlign: "center",
  },
});

// Create Document Component
const RelatorioPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={styles.image} src="/img/projeta.png" />
        <Text style={styles.title}>Relatório Diário de Obras</Text>
        <Text style={styles.header}>Dados da Obra</Text>
        <Text style={styles.text}>
          Número do Contrato: {formData.numeroContrato}
        </Text>
        <Text style={styles.text}>Nome da Obra: {formData.nomeObra}</Text>
        <Text style={styles.text}>Cliente: {formData.cliente}</Text>
        <Text style={styles.text}>Data: {formData.data}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Detalhes do Trabalho</Text>
        <Text style={styles.text}>
          Horas Trabalhadas: {formData.horasTrabalhadas}
        </Text>
        <Text style={styles.text}>Tempo pela Manhã: {formData.tempoManha}</Text>
        <Text style={styles.text}>Tempo pela Tarde: {formData.tempoTarde}</Text>
        <Text style={styles.text}>
          Observações da Fiscalização: {formData.observacoesFiscalizacao}
        </Text>
        <Text style={styles.text}>
          Observações da Contratada: {formData.observacoesContratada}
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
