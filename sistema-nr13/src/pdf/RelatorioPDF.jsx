import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica"
  },

  header: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: "#000"
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },

  logoContainer: {
    flexDirection: "column",
    alignItems: "flex-start"
  },

  logoText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3
  },

  logoSubtext: {
    fontSize: 8,
    color: "#333"
  },

  reportNumber: {
    fontSize: 11,
    fontWeight: "bold",
    textDecoration: "underline",
    marginTop: 5
  },

  mainTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    textTransform: "uppercase"
  },

  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
    fontWeight: "bold"
  },

  section: {
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    padding: 10
  },

  label: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 3
  },

  value: {
    fontSize: 10,
    marginBottom: 5
  }
});

export const RelatorioPDF = ({ dados }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Padrão */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>SOUZA&AQUINO</Text>
            <Text style={styles.logoSubtext}>MAESTRIA EM ENGENHARIA MECANICA</Text>
          </View>
          <Text style={styles.reportNumber}>
            Relatório Nº {dados.numeroRelatorio || "VP_00_000"}
          </Text>
        </View>

        <Text style={styles.mainTitle}>
          RELATÓRIO TÉCNICO DE INSPEÇÃO – NR13
        </Text>
        <Text style={styles.subtitle}>
          VASOS SOB PRESSÃO
        </Text>
      </View>

      {/* Cliente */}
      <View style={styles.section}>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.value}>{dados.cliente || "-"}</Text>

        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.value}>{dados.endereco || "-"}</Text>
      </View>

      {/* Dados do Equipamento */}
      <View style={styles.section}>
        <Text style={styles.label}>Equipamento:</Text>
        <Text style={styles.value}>{dados.equipamento || "-"}</Text>

        <Text style={styles.label}>Fabricante:</Text>
        <Text style={styles.value}>{dados.fabricante || "-"}</Text>

        <Text style={styles.label}>Nº de Série:</Text>
        <Text style={styles.value}>{dados.numeroSerie || "-"}</Text>

        <Text style={styles.label}>Ano de Fabricação:</Text>
        <Text style={styles.value}>
          {dados.anoFabricacao 
            ? new Date(dados.anoFabricacao).getFullYear() 
            : "-"}
        </Text>

        <Text style={styles.label}>TAG:</Text>
        <Text style={styles.value}>{dados.tag || "-"}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{dados.tipo || "-"}</Text>

        <Text style={styles.label}>PMTA (Pressão Máxima de Trabalho Admissível):</Text>
        <Text style={styles.value}>
          {dados.pmta ? `${dados.pmta} kgf/cm²` : "-"}
        </Text>
      </View>

      {/* Parecer Técnico */}
      <View style={styles.section}>
        <Text style={styles.label}>Parecer Técnico:</Text>
        <Text style={styles.value}>{dados.parecer || "-"}</Text>
      </View>
    </Page>
  </Document>
);
