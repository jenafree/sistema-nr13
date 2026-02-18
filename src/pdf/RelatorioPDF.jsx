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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
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

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#1e3a8a",
    color: "#ffffff",
    padding: 6,
    textTransform: "uppercase"
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

  row: {
    flexDirection: "row",
    marginBottom: 5
  },

  rowLabel: {
    width: "40%",
    fontSize: 9,
    fontWeight: "bold"
  },

  rowValue: {
    width: "60%",
    fontSize: 10
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
  },
  
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#ccc",
    paddingTop: 5
  },
  
  termoSection: {
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#000",
    padding: 15,
    backgroundColor: "#fafafa"
  },
  
  termoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#1e3a8a",
    color: "#ffffff",
    padding: 8,
    textTransform: "uppercase"
  },
  
  termoText: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: "justify"
  },
  
  termoSignature: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#000"
  },
  
  termoSignatureName: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5
  },
  
  termoSignatureTitle: {
    fontSize: 9,
    marginTop: 2
  },
  
  termoSignatureCrea: {
    fontSize: 9,
    marginTop: 2
  },

  table: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5
  },

  tableCell: {
    flex: 1,
    fontSize: 9,
    paddingHorizontal: 5
  },

  tableCellBold: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 5
  }
});

// Função auxiliar para processar texto com negrito
const processBoldText = (text) => {
  if (!text) return [];
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  const result = [];
  
  parts.forEach((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      result.push({ type: 'bold', text: boldText, key: index });
    } else if (part.trim() !== '') {
      result.push({ type: 'normal', text: part, key: index });
    }
  });
  
  return result;
};

// Função para formatar data
const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
};

// Função para formatar data completa (com mês por extenso)
const formatTermoDateFull = (dateString, local) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const localStr = local ? `${local}, ` : "";
    return `${localStr}${day} de ${month} de ${year}.`;
  } catch {
    return dateString;
  }
};

// Função para formatar PMTA
const formatPMTA = (value) => {
  if (!value) return "-";
  const num = parseFloat(value.toString().replace(',', '.'));
  if (isNaN(num)) return value;
  return `${num.toFixed(2).replace('.', ',')} kgf/cm²`;
};

// Logo base64 extraída do SVG
const LOGO_BASE64 = "data:image/png;base64,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";

// Componente de Header reutilizável
const PDFHeader = ({ numeroRelatorio }) => (
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <View style={styles.logoContainer}>
        <Image 
          src={LOGO_BASE64}
          style={{ width: 130, height: 80, objectFit: 'contain' }}
        />
      </View>
      <Text style={styles.reportNumber}>
        Relatório Nº {numeroRelatorio || "VP_00_000"}
      </Text>
    </View>
    <Text style={styles.mainTitle}>
      RELATÓRIO TÉCNICO DE INSPEÇÃO – NR13
    </Text>
    <Text style={styles.subtitle}>
      VASOS SOB PRESSÃO
    </Text>
  </View>
);

export const RelatorioPDF = ({ dados }) => {
  return (
    <Document>
      {/* PÁGINA 1: RESUMO DO RELATÓRIO */}
      <Page size="A4" style={styles.page} wrap={true}>
        <PDFHeader numeroRelatorio={dados.numeroRelatorio} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. RESUMO DO RELATÓRIO</Text>
          
          {/* Dados do Equipamento */}
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
              <Text style={styles.value}>{dados.anoFabricacao || "-"}</Text>

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
            <View style={styles.inspectionOption}>
              <View style={dados.tipoInspecao === "Periódica Externa e Interna" ? styles.checkbox : styles.checkboxEmpty} />
              <Text style={styles.value}>Periódica Externa e Interna</Text>
            </View>
            <View style={styles.inspectionOption}>
              <View style={dados.tipoInspecao === "Extraordinária" ? styles.checkbox : styles.checkboxEmpty} />
              <Text style={styles.value}>Extraordinária</Text>
            </View>
          </View>

          <Text style={styles.label}>PMTA (Pressão Máxima de Trabalho Admissível):</Text>
          <Text style={styles.value}>{formatPMTA(dados.pmta)}</Text>

          <Text style={styles.label}>Local:</Text>
          <Text style={styles.value}>{dados.local || "-"}</Text>

          <Text style={styles.label}>Data de Início:</Text>
          <Text style={styles.value}>{formatDate(dados.dataInicio)}</Text>

          <Text style={styles.label}>Data de Fim:</Text>
          <Text style={styles.value}>{formatDate(dados.dataFim)}</Text>
        </View>

        {/* Dados do Contratante (Resumo) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DADOS DO CONTRATANTE</Text>
          <View style={{ backgroundColor: "#f0f0f0", padding: 8, marginTop: 5, marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>CLIENTE</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Razão social:</Text>
            <Text style={styles.rowValue}>{dados.razaoSocial || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>CNPJ:</Text>
            <Text style={styles.rowValue}>{dados.cnpj || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>CEP:</Text>
            <Text style={styles.rowValue}>{dados.cep || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Endereço:</Text>
            <Text style={styles.rowValue}>{dados.endereco || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Cidade:</Text>
            <Text style={styles.rowValue}>{dados.cidade || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estado:</Text>
            <Text style={styles.rowValue}>{dados.estado || "-"}</Text>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Página ${pageNumber} de ${totalPages}`
        )} fixed />
      </Page>

      {/* PÁGINA 2: DADOS DO CONTRATANTE (Detalhado) */}
      {(dados.razaoSocial || dados.cnpj || dados.endereco) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. DADOS DO CONTRATANTE</Text>
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

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 3: RESPONSABILIDADES */}
      {(dados.plhNome || dados.plhTituloProfissional || dados.plhCrea) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. RESPONSABILIDADES</Text>
            <Text style={styles.label}>Nome do Responsável Técnico:</Text>
            <Text style={styles.value}>{dados.plhNome || "-"}</Text>

            <Text style={styles.label}>Título Profissional:</Text>
            <Text style={styles.value}>{dados.plhTituloProfissional || "-"}</Text>

            <Text style={styles.label}>CREA:</Text>
            <Text style={styles.value}>{dados.plhCrea || "-"}</Text>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 4: REFERÊNCIAS NORMATIVAS */}
      <Page size="A4" style={styles.page} wrap={true}>
        <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. REFERÊNCIAS NORMATIVAS</Text>
          <Text style={styles.value}>
            - NR-13 (Norma Regulamentadora 13) - Caldeiras e Vasos de Pressão{'\n'}
            - ABNT NBR 13436 - Inspeção de vasos de pressão{'\n'}
            - ABNT NBR 13437 - Requisitos para inspeção de caldeiras{'\n'}
            - Outras normas aplicáveis conforme especificação do projeto
          </Text>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Página ${pageNumber} de ${totalPages}`
        )} fixed />
      </Page>

      {/* PÁGINA 5: INFORMAÇÕES DO VASO */}
      {(dados.fluidoCasco || dados.fluidoTubos || dados.pmtaCasco || dados.pmtaTubos) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. INFORMAÇÕES DO VASO</Text>
            
            {dados.tipoVasoSelecionado === "casco" && (
              <>
                <Text style={styles.label}>DADOS OPERACIONAIS - CASCO</Text>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Fluido:</Text>
                  <Text style={styles.rowValue}>{dados.fluidoCasco || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>PMTA:</Text>
                  <Text style={styles.rowValue}>{formatPMTA(dados.pmtaCasco)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Pressão de Projeto:</Text>
                  <Text style={styles.rowValue}>{dados.pressaoProjetoCasco || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Temperatura de Operação:</Text>
                  <Text style={styles.rowValue}>{dados.temperaturaOperacaoCasco || "-"}</Text>
                </View>
              </>
            )}

            {dados.tipoVasoSelecionado === "tubos" && (
              <>
                <Text style={styles.label}>DADOS OPERACIONAIS - TUBOS/CALANDRA</Text>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Fluido:</Text>
                  <Text style={styles.rowValue}>{dados.fluidoTubos || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>PMTA:</Text>
                  <Text style={styles.rowValue}>{formatPMTA(dados.pmtaTubos)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Pressão de Projeto:</Text>
                  <Text style={styles.rowValue}>{dados.pressaoProjetoTubos || "-"}</Text>
                </View>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 6: EXAME DA DOCUMENTAÇÃO */}
      {(dados.prontuarioStatus || dados.registroSegurancaStatus) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. EXAME DA DOCUMENTAÇÃO</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Prontuário:</Text>
              <Text style={styles.rowValue}>{dados.prontuarioStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Registro de Segurança:</Text>
              <Text style={styles.rowValue}>{dados.registroSegurancaStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Relatório Anterior:</Text>
              <Text style={styles.rowValue}>{dados.relatorioAnteriorStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>PAR:</Text>
              <Text style={styles.rowValue}>{dados.parStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Certificado de Calibração:</Text>
              <Text style={styles.rowValue}>{dados.certificadoCalibracaoStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Teste Hidrostático:</Text>
              <Text style={styles.rowValue}>{dados.testeHidrostaticoStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Manual de Operação:</Text>
              <Text style={styles.rowValue}>{dados.manualOperacaoStatus || "-"}</Text>
            </View>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 7: RELATÓRIO ANTERIOR */}
      {(dados.inspecaoPrazoStatus || dados.recomendacoesCumpridasStatus) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. RELATÓRIO ANTERIOR</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Inspeção dentro do prazo:</Text>
              <Text style={styles.rowValue}>{dados.inspecaoPrazoStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Recomendações cumpridas:</Text>
              <Text style={styles.rowValue}>{dados.recomendacoesCumpridasStatus || "-"}</Text>
            </View>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 8: INSTALAÇÕES */}
      {(dados.acessoSeguroStatus || dados.requisitosVasoStatus) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. INSTALAÇÕES</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Acesso Seguro:</Text>
              <Text style={styles.rowValue}>{dados.acessoSeguroStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Requisitos do Vaso:</Text>
              <Text style={styles.rowValue}>{dados.requisitosVasoStatus || "-"}</Text>
            </View>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 9: EXAME EXTERNO */}
      {(dados.placaIdentificacaoStatus || dados.adesivoPinturaStatus || dados.fotosExameExterno) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. EXAME EXTERNO</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Placa de Identificação:</Text>
              <Text style={styles.rowValue}>{dados.placaIdentificacaoStatus || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Adesivo/Pintura:</Text>
              <Text style={styles.rowValue}>{dados.adesivoPinturaStatus || "-"}</Text>
            </View>
            {dados.observacoesFotos && (
              <>
                <Text style={styles.label}>Observações sobre Fotos:</Text>
                <Text style={styles.value}>{dados.observacoesFotos}</Text>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 10: EXAME INTERNO */}
      {(dados.observacoesExameInterno91 || dados.observacoesExameInterno92) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. EXAME INTERNO</Text>
            {dados.observacoesExameInterno91 && (
              <>
                <Text style={styles.label}>9.1 Outros:</Text>
                <Text style={styles.value}>{dados.observacoesExameInterno91}</Text>
              </>
            )}
            {dados.observacoesExameInterno92 && (
              <>
                <Text style={styles.label}>9.2 Outros:</Text>
                <Text style={styles.value}>{dados.observacoesExameInterno92}</Text>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 11: ENSAIOS REALIZADOS */}
      {(dados.ensaioMaterial || dados.testesPressaoFoiRealizado) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. ENSAIOS REALIZADOS</Text>
            {dados.ensaioMaterial && (
              <>
                <Text style={styles.label}>Material:</Text>
                <Text style={styles.value}>{dados.ensaioMaterial}</Text>
              </>
            )}
            {dados.ensaioAparelho && (
              <>
                <Text style={styles.label}>Aparelho:</Text>
                <Text style={styles.value}>{dados.ensaioAparelho}</Text>
              </>
            )}
            {dados.testesPressaoFoiRealizado && (
              <>
                <Text style={styles.label}>Teste de Pressão Realizado:</Text>
                <Text style={styles.value}>{dados.testesPressaoFoiRealizado}</Text>
              </>
            )}
            {dados.testesPressaoObservacoes && (
              <>
                <Text style={styles.label}>Observações:</Text>
                <Text style={styles.value}>{dados.testesPressaoObservacoes}</Text>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 12: RECOMENDAÇÕES */}
      {dados.recomendacoes && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. RECOMENDAÇÕES</Text>
            <Text style={styles.value}>{dados.recomendacoes}</Text>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 13: CONCLUSÃO */}
      {(dados.conclusaoStatus || dados.conclusaoDescricao) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. CONCLUSÃO</Text>
            {dados.conclusaoStatus && (
              <>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{dados.conclusaoStatus}</Text>
              </>
            )}
            {dados.conclusaoPmta && (
              <>
                <Text style={styles.label}>PMTA a ser adotada:</Text>
                <Text style={styles.value}>{formatPMTA(dados.conclusaoPmta)}</Text>
              </>
            )}
            {dados.conclusaoDescricao && (
              <>
                <Text style={styles.label}>Descrição:</Text>
                <View style={styles.termoText}>
                  {dados.conclusaoDescricao.split('\n').map((line, index) => {
                    const processed = processBoldText(line);
                    if (processed.length === 0) return null;
                    
                    return (
                      <Text key={index} style={{ marginBottom: 5 }}>
                        {processed.map((item) => {
                          if (item.type === 'bold') {
                            return <Text key={item.key} style={{ fontWeight: 'bold' }}>{item.text}</Text>;
                          }
                          return item.text;
                        })}
                      </Text>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 14: PRÓXIMAS INSPEÇÕES */}
      {(dados.proximaInspecaoExameExterno || dados.proximaInspecaoExameInterno) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. PRÓXIMAS INSPEÇÕES</Text>
            {dados.proximaInspecaoExameExterno && (
              <>
                <Text style={styles.label}>Próxima Inspeção - Exame Externo:</Text>
                <Text style={styles.value}>{dados.proximaInspecaoExameExterno}</Text>
              </>
            )}
            {dados.proximaInspecaoExameInterno && (
              <>
                <Text style={styles.label}>Próxima Inspeção - Exame Interno:</Text>
                <Text style={styles.value}>{dados.proximaInspecaoExameInterno}</Text>
              </>
            )}
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 15: ANEXOS */}
      {(dados.anexo1Files || dados.anexo2Files || dados.anexo3Files) && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>15. ANEXOS</Text>
            {dados.anexosData && (
              <>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{dados.anexosData}</Text>
              </>
            )}
            {dados.anexosAssinatura && (
              <>
                <Text style={styles.label}>Assinatura:</Text>
                <Text style={styles.value}>{dados.anexosAssinatura}</Text>
              </>
            )}
            <Text style={styles.value}>
              {dados.anexo1Files && `Anexo 1: ${Array.isArray(dados.anexo1Files) ? dados.anexo1Files.length : 1} arquivo(s)\n`}
              {dados.anexo2Files && `Anexo 2: ${Array.isArray(dados.anexo2Files) ? dados.anexo2Files.length : 1} arquivo(s)\n`}
              {dados.anexo3Files && `Anexo 3: ${Array.isArray(dados.anexo3Files) ? dados.anexo3Files.length : 1} arquivo(s)`}
            </Text>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}

      {/* PÁGINA 16: TERMO DE INSPEÇÃO */}
      {dados.termoTexto && (
        <Page size="A4" style={styles.page} wrap={true}>
          <PDFHeader numeroRelatorio={dados.numeroRelatorio} />
          
          <View style={styles.termoSection}>
            <Text style={styles.termoTitle}>16. TERMO DE INSPEÇÃO</Text>
            
            <View style={styles.termoText}>
              {dados.termoTexto.split('\n').map((line, index) => {
                const processed = processBoldText(line);
                if (processed.length === 0) return null;
                
                return (
                  <Text key={index} style={{ marginBottom: 5 }}>
                    {processed.map((item) => {
                      if (item.type === 'bold') {
                        return <Text key={item.key} style={{ fontWeight: 'bold' }}>{item.text}</Text>;
                      }
                      return item.text;
                    })}
                  </Text>
                );
              })}
            </View>
            
            {/* Data e Local */}
            <Text style={{ fontSize: 10, textAlign: "right", marginTop: 15 }}>
              {formatTermoDateFull(dados.termoData || dados.dataFim, dados.termoLocal)}
            </Text>
            
            {/* Assinatura */}
            <View style={styles.termoSignature}>
              {dados.termoImagem && (
                <Image 
                  src={dados.termoImagem} 
                  style={{ width: 150, height: 80, marginBottom: 10, objectFit: 'contain' }}
                />
              )}
              <View style={{ borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#000", paddingTop: 5, marginTop: dados.termoImagem ? 0 : 30 }}>
                <Text style={styles.termoSignatureName}>
                  {dados.termoEngenheiroNome || dados.plhNome || ""}
                </Text>
                <Text style={styles.termoSignatureTitle}>
                  {dados.termoEngenheiroTitulo || dados.plhTituloProfissional || ""}
                </Text>
                <Text style={styles.termoSignatureCrea}>
                  CREA {dados.termoEngenheiroCrea || dados.plhCrea || ""}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
            `Página ${pageNumber} de ${totalPages}`
          )} fixed />
        </Page>
      )}
    </Document>
  );
};
