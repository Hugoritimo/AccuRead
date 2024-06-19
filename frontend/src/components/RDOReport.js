import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';

// Fontes personalizadas (opcional)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff2' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgWxP.ttf', fontWeight: 'bold' },
  ]
});

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto'
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    marginBottom: 10,
    alignSelf: 'center'
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 12,
    color: '#555',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 'auto',
    width: 'auto',
    height: 200,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

const RDOReport = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/img/projeta.png" />
        <Text style={styles.title}>Relatório Diário de Obra</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Número do Contrato:</Text>
        <Text style={styles.value}>{formData.numeroContrato}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Nome da Obra:</Text>
        <Text style={styles.value}>{formData.nomeObra}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{formData.cliente}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Data de Início da Obra:</Text>
        <Text style={styles.value}>{formData.dataInicio}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Data de Término da Obra:</Text>
        <Text style={styles.value}>{formData.dataTermino}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horas Trabalhadas Neste Dia:</Text>
        <Text style={styles.value}>{formData.horasTrabalhadas}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Tempo pela Manhã:</Text>
        <Text style={styles.value}>{formData.tempoManha}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Tempo pela Tarde:</Text>
        <Text style={styles.value}>{formData.tempoTarde}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Disciplina:</Text>
        <Text style={styles.value}>{formData.disciplina}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Local da Obra:</Text>
        <Text style={styles.value}>{formData.localObra}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Chegada da Equipe Projeta no Canteiro:</Text>
        <Text style={styles.value}>{formData.horarioChegadaEquipe}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Realização de DDS:</Text>
        <Text style={styles.value}>{formData.horarioDDS}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Chegada do Fiscal na Frente de Serviço:</Text>
        <Text style={styles.value}>{formData.chegadaFiscal}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Nome e Empresa do Fiscal:</Text>
        <Text style={styles.value}>{formData.nomeFiscal}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Liberação da Frente de Serviço:</Text>
        <Text style={styles.value}>{formData.liberacaoFrenteServico}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Início das Atividades:</Text>
        <Text style={styles.value}>{formData.inicioAtividades}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Almoço (Saída):</Text>
        <Text style={styles.value}>{formData.almocoSaida}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Almoço (Retorno):</Text>
        <Text style={styles.value}>{formData.almocoRetorno}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Finalização das Atividades:</Text>
        <Text style={styles.value}>{formData.finalizacaoAtividades}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Horário de Saída do Canteiro:</Text>
        <Text style={styles.value}>{formData.saidaCanteiro}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Observações:</Text>
        <Text style={styles.value}>{formData.observacoes}</Text>
      </View>
      {formData.fotos.length > 0 && (
        <View>
          <Text style={styles.title}>Relatório Fotográfico</Text>
          {formData.fotos.map((foto, index) => (
            <View key={index} style={styles.section}>
              <Image style={styles.image} src={URL.createObjectURL(foto)} />
            </View>
          ))}
        </View>
      )}
      <Text style={styles.footer}>Assinatura Responsável PROJETA</Text>
      <Text style={styles.footer}>Assinatura Planejamento PROJETA</Text>
      <Text style={styles.footer}>Assinatura Fiscalização Alumar</Text>
    </Page>
  </Document>
);

export default RDOReport;
