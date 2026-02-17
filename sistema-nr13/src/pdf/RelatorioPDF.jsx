import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

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
    width: 150,
    minHeight: 90,
    backgroundColor: "#1e3a8a",
    borderRadius: 15,
    padding: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 2,
    textAlign: "center"
  },

  logoAmpersand: {
    fontSize: 18,
    color: "#93c5fd"
  },

  logoSubtext: {
    fontSize: 7,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 2
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

  equipmentSection: {
    flexDirection: "row",
    marginBottom: 15
  },

  equipmentImage: {
    width: 200,
    height: 150,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc"
  },

  equipmentData: {
    flex: 1
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
  },

  inspectionTypeSection: {
    marginTop: 10,
    marginBottom: 10
  },

  inspectionTypeLabel: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 5
  },

  inspectionOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3
  },

  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 5,
    backgroundColor: "#000"
  },

  checkboxEmpty: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 5
  }
});

export const RelatorioPDF = ({ dados }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Padrão */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              SOUZA<Text style={styles.logoAmpersand}>&amp;</Text>AQUINO
            </Text>
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

      {/* Dados do Contratante */}
      <View style={styles.section}>
        <Text style={styles.label}>1. DADOS DO CONTRATANTE</Text>
        <View style={{ backgroundColor: "#f0f0f0", padding: 8, marginTop: 5, marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>CLIENTE</Text>
        </View>
        <Text style={styles.label}>Razão social:</Text>
        <Text style={styles.value}>{dados.razaoSocial || "-"}</Text>

        <Text style={styles.label}>CNPJ:</Text>
        <Text style={styles.value}>{dados.cnpj || "-"}</Text>

        <Text style={styles.label}>CEP:</Text>
        <Text style={styles.value}>{dados.cep || "-"}</Text>

        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.value}>{dados.endereco || "-"}</Text>

        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.value}>{dados.cidade || "-"}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{dados.estado || "-"}</Text>
      </View>

      {/* Dados do Equipamento */}
      <View style={styles.section}>
        <View style={styles.equipmentSection}>
          <View style={styles.equipmentImage}>
            {dados.imagemEquipamento ? (
              <Image 
                src={dados.imagemEquipamento} 
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={{ fontSize: 8, color: "#999", textAlign: "center", marginTop: 60 }}>
                [Imagem do Equipamento]
              </Text>
            )}
          </View>
          <View style={styles.equipmentData}>
            <Text style={styles.label}>Equipamento:</Text>
            <Text style={styles.value}>{dados.equipamento || "-"}</Text>

            <Text style={styles.label}>Fabricante:</Text>
            <Text style={styles.value}>{dados.fabricante || "-"}</Text>

            <Text style={styles.label}>Nº de série:</Text>
            <Text style={styles.value}>{dados.numeroSerie || "-"}</Text>

            <Text style={styles.label}>Ano de Fabricação:</Text>
            <Text style={styles.value}>
              {dados.anoFabricacao || "-"}
            </Text>

            <Text style={styles.label}>TAG:</Text>
            <Text style={styles.value}>{dados.tag || "-"}</Text>

            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{dados.tipo || "-"}</Text>
          </View>
        </View>

        <View style={styles.inspectionTypeSection}>
          <Text style={styles.inspectionTypeLabel}>TIPO DE INSPEÇÃO:</Text>
          <View style={styles.inspectionOption}>
            <View style={dados.tipoInspecao === "Inicial" ? styles.checkbox : styles.checkboxEmpty} />
            <Text style={styles.value}>Inicial</Text>
          </View>
          <View style={styles.inspectionOption}>
            <View style={dados.tipoInspecao === "Periódica Externa" ? styles.checkbox : styles.checkboxEmpty} />
            <Text style={styles.value}>Periódica Externa</Text>
          </View>
        </View>

        <Text style={styles.label}>PMTA (Pressão Máxima de Trabalho Admissível):</Text>
        <Text style={styles.value}>
          {dados.pmta ? `${dados.pmta} kgf/cm²` : "-"}
        </Text>
      </View>

    </Page>
  </Document>
);
