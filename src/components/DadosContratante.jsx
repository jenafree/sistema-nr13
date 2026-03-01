import React, { useState, useEffect } from "react";
import { validateCNPJ, validateCEP } from "../utils/validations";
import "../styles/form.css";

export default function DadosContratante({ formData, setFormData }) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [cnpjValido, setCnpjValido] = useState(null); // null = não validado, true = válido, false = inválido
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [buscandoRazaoSocial, setBuscandoRazaoSocial] = useState(false);

  /**
   * API DO IBGE - Estados e Cidades
   * 
   * Como funciona:
   * 1. API oficial e gratuita do IBGE (Instituto Brasileiro de Geografia e Estatística)
   * 2. Não precisa de API key ou autenticação
   * 3. Retorna dados atualizados de todos os estados e municípios do Brasil
   * 
   * Endpoints utilizados:
   * - Estados: https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome
   *   Retorna: Array com todos os 27 estados (incluindo DF)
   *   Exemplo de resposta: [{ id: 52, sigla: "GO", nome: "Goiás" }, ...]
   * 
   * - Cidades: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios?orderBy=nome
   *   Retorna: Array com todas as cidades do estado selecionado
   *   Exemplo: https://servicodados.ibge.gov.br/api/v1/localidades/estados/GO/municipios?orderBy=nome
   *   Retorna: [{ id: 5208707, nome: "Goianésia" }, ...]
   * 
   * Fluxo:
   * 1. Ao abrir a página → Carrega todos os estados
   * 2. Usuário seleciona estado → Busca cidades daquele estado
   * 3. Usuário seleciona cidade → Pronto!
   */
  
  // Carregar estados ao montar o componente
  useEffect(() => {
    async function carregarEstados() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      }
    }
    carregarEstados();
  }, []);

  // Carregar cidades quando o estado mudar
  useEffect(() => {
    const estadoSelecionado = formData.estado;
    
    if (estadoSelecionado) {
      setLoadingCidades(true);
      async function carregarCidades() {
        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios?orderBy=nome`);
          const data = await response.json();
          setCidades(data);
          setLoadingCidades(false);
          
          // Só limpar cidade se a atual não existir na nova lista (ex: usuário trocou de estado)
          // Não limpar quando CNPJ/CEP preencheram cidade - ela será válida na lista
          setFormData(prev => {
            const cidadeAtual = prev.cidade || "";
            const cidadeExiste = data.some(c => c.nome === cidadeAtual);
            return {
              ...prev,
              cidade: cidadeExiste ? cidadeAtual : ""
            };
          });
        } catch (error) {
          console.error('Erro ao carregar cidades:', error);
          setLoadingCidades(false);
        }
      }
      carregarCidades();
    } else {
      setCidades([]);
    }
  }, [formData.estado, setFormData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Máscara para CNPJ
  function handleCNPJChange(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (value.length <= 14) {
      // Aplica máscara: XX.XXX.XXX/XXXX-XX
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      
      setFormData({
        ...formData,
        cnpj: value
      });

      // Validar CNPJ quando tiver 18 caracteres (com máscara)
      if (value.length === 18) {
        const validation = validateCNPJ(value);
        const valido = validation.valid;
        setCnpjValido(valido);
        
        // Se CNPJ válido, buscar razão social automaticamente (com delay para evitar muitas requisições)
        if (valido) {
          setTimeout(() => {
            buscarRazaoSocialPorCNPJ(value);
          }, 500);
        }
      } else {
        setCnpjValido(null);
      }
    }
  }

  // Buscar dados da empresa via CNPJ — preenche automaticamente todos os campos
  async function buscarRazaoSocialPorCNPJ(cnpj) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    
    if (cnpjLimpo.length !== 14) return;
    
    setBuscandoRazaoSocial(true);
    try {
      // API ReceitaWS (gratuita, sem necessidade de API key)
      // Usando proxy CORS se necessário
      const response = await fetch(`https://www.receitaws.com.br/v1/${cnpjLimpo}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      
      const data = await response.json();
      
      // Verificar se a resposta é válida
      if (data && data.nome && data.status !== 'ERROR') {
        // Montar endereço completo
        let enderecoCompleto = "";
        if (data.logradouro) {
          enderecoCompleto = data.logradouro;
          if (data.numero) {
            enderecoCompleto += `, ${data.numero}`;
          }
          if (data.complemento) {
            enderecoCompleto += `, ${data.complemento}`;
          }
          if (data.bairro) {
            enderecoCompleto += `, ${data.bairro}`;
          }
        }

        // Carregar cidades usando a UF retornada pela API (não depende de estados estarem carregados)
        const novoEstado = (data.uf || '').toUpperCase() || null;
        
        if (novoEstado) {
          setLoadingCidades(true);
          try {
            const cidadeResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${novoEstado}/municipios?orderBy=nome`);
            const cidadeData = await cidadeResponse.json();
            setCidades(cidadeData);
            setLoadingCidades(false);
            
                // Buscar cidade pelo nome retornado pela API (case insensitive, sem acentos, sem espaços extras)
                const municipioAPI = (data.municipio || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const cidadeEncontrada = cidadeData.find(c => {
                  const nomeCidade = (c.nome || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  return nomeCidade === municipioAPI || nomeCidade.startsWith(municipioAPI) || municipioAPI.startsWith(nomeCidade) || nomeCidade.includes(municipioAPI) || municipioAPI.includes(nomeCidade);
                });
                
                // Preencher todos os campos após carregar cidades
                setFormData(prev => ({
                  ...prev,
                  razaoSocial: data.nome,
                  endereco: enderecoCompleto || prev.endereco,
                  cep: data.cep ? data.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
                  cidade: cidadeEncontrada ? cidadeEncontrada.nome : (data.municipio || prev.cidade),
                  estado: novoEstado
                }));
          } catch (error) {
            console.error('Erro ao carregar cidades após busca de CNPJ:', error);
            setLoadingCidades(false);
            // Mesmo com erro, preencher o que conseguir
            setFormData(prev => ({
              ...prev,
              razaoSocial: data.nome,
              endereco: enderecoCompleto || prev.endereco,
              cep: data.cep ? data.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
              cidade: data.municipio || prev.cidade,
              estado: novoEstado || prev.estado
            }));
          }
        } else {
          // Se não encontrou estado, preencher o que conseguir
          setFormData(prev => ({
            ...prev,
            razaoSocial: data.nome,
            endereco: enderecoCompleto || prev.endereco,
            cep: data.cep ? data.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
            cidade: data.municipio || prev.cidade,
            estado: data.uf ? data.uf.toUpperCase() : prev.estado
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar razão social (ReceitaWS):', error);
      // Tentar API alternativa BrasilAPI se ReceitaWS falhar
      try {
        const responseAlt = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        if (responseAlt.ok) {
          const dataAlt = await responseAlt.json();
          if (dataAlt.razao_social) {
            // Montar endereço completo da BrasilAPI
            let enderecoCompleto = "";
            if (dataAlt.logradouro) {
              enderecoCompleto = dataAlt.logradouro;
              if (dataAlt.numero) {
                enderecoCompleto += `, ${dataAlt.numero}`;
              }
              if (dataAlt.complemento) {
                enderecoCompleto += `, ${dataAlt.complemento}`;
              }
              if (dataAlt.bairro) {
                enderecoCompleto += `, ${dataAlt.bairro}`;
              }
            }

            // Carregar cidades usando a UF retornada pela API
            const novoEstado = (dataAlt.uf || '').toUpperCase() || null;
            if (novoEstado) {
              setLoadingCidades(true);
              try {
                const cidadeResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${novoEstado}/municipios?orderBy=nome`);
                const cidadeData = await cidadeResponse.json();
                setCidades(cidadeData);
                setLoadingCidades(false);
                
                // Buscar cidade pelo nome retornado pela API (case insensitive, sem acentos, sem espaços extras)
                const municipioAPI = (dataAlt.municipio || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const cidadeEncontrada = cidadeData.find(c => {
                  const nomeCidade = (c.nome || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  return nomeCidade === municipioAPI || nomeCidade.startsWith(municipioAPI) || municipioAPI.startsWith(nomeCidade) || nomeCidade.includes(municipioAPI) || municipioAPI.includes(nomeCidade);
                });
                
                setFormData(prev => ({
                  ...prev,
                  razaoSocial: dataAlt.razao_social,
                  endereco: enderecoCompleto || prev.endereco,
                  cep: dataAlt.cep ? dataAlt.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
                  cidade: cidadeEncontrada ? cidadeEncontrada.nome : (dataAlt.municipio || prev.cidade),
                  estado: novoEstado
                }));
              } catch (error) {
                console.error('Erro ao carregar cidades após busca de CNPJ (BrasilAPI):', error);
                setLoadingCidades(false);
                setFormData(prev => ({
                  ...prev,
                  razaoSocial: dataAlt.razao_social,
                  endereco: enderecoCompleto || prev.endereco,
                  cep: dataAlt.cep ? dataAlt.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
                  cidade: dataAlt.municipio || prev.cidade,
                  estado: novoEstado
                }));
              }
            } else {
              setFormData(prev => ({
                ...prev,
                razaoSocial: dataAlt.razao_social,
                endereco: enderecoCompleto || prev.endereco,
                cep: dataAlt.cep ? dataAlt.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2') : prev.cep,
                cidade: dataAlt.municipio || prev.cidade,
                estado: prev.estado
              }));
            }
          }
        }
      } catch (errorAlt) {
        console.error('Erro na API alternativa (BrasilAPI):', errorAlt);
      }
    } finally {
      setBuscandoRazaoSocial(false);
    }
  }

  // Validação de CNPJ agora usa validateCNPJ do utilitário (já importado)

  // Máscara para CEP
  function handleCEPChange(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
      // Aplica máscara: XXXXX-XXX
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      
      setFormData({
        ...formData,
        cep: value
      });

      // Buscar CEP automaticamente quando tiver 9 caracteres (com máscara)
      if (value.length === 9) {
        buscarCEP(value);
      }
    }
  }

  // Buscar CEP via API ViaCEP
  async function buscarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;
    
    setBuscandoCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (!data.erro && data.uf) {
        // Buscar sigla do estado pelo nome
        const estadoEncontrado = estados.find(e => 
          e.sigla === data.uf.toUpperCase()
        );
        
        const novoEstado = estadoEncontrado ? estadoEncontrado.sigla : data.uf.toUpperCase();
        
        // Preencher endereço apenas com o logradouro (rua) se existir
        // Se for "Área Rural" ou similar, não preencher (deixa usuário preencher manualmente)
        let logradouro = "";
        if (data.logradouro && 
            !data.logradouro.toLowerCase().includes("área rural") && 
            !data.logradouro.toLowerCase().includes("rural")) {
          logradouro = data.logradouro;
        }
        
        // Carregar cidades para preencher a cidade correta (ViaCEP retorna UF)
        if (novoEstado) {
          setLoadingCidades(true);
          try {
            const cidadeResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${novoEstado}/municipios?orderBy=nome`);
            const cidadeData = await cidadeResponse.json();
            setCidades(cidadeData);
            setLoadingCidades(false);
            
            // Buscar cidade pelo nome retornado pela API (case insensitive, sem acentos, sem espaços extras)
            const municipioAPI = (data.localidade || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const cidadeEncontrada = cidadeData.find(c => {
              const nomeCidade = (c.nome || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              return nomeCidade === municipioAPI || nomeCidade.startsWith(municipioAPI) || municipioAPI.startsWith(nomeCidade) || nomeCidade.includes(municipioAPI) || municipioAPI.includes(nomeCidade);
            });
            
            setFormData(prev => ({
              ...prev,
              // Preenche apenas o logradouro (rua) se for uma rua válida
              // Se for área rural, deixa vazio para usuário preencher
              endereco: logradouro || prev.endereco,
              cidade: cidadeEncontrada ? cidadeEncontrada.nome : (data.localidade || prev.cidade),
              estado: novoEstado,
              cep: cep
            }));
          } catch (error) {
            console.error('Erro ao carregar cidades após busca de CEP:', error);
            setLoadingCidades(false);
            // Mesmo com erro, preencher o que conseguir
            setFormData(prev => ({
              ...prev,
              endereco: logradouro || prev.endereco,
              cidade: data.localidade || prev.cidade,
              estado: novoEstado,
              cep: cep
            }));
          }
        } else {
          setFormData(prev => ({
            ...prev,
            endereco: logradouro || prev.endereco,
            cidade: data.localidade || prev.cidade,
            estado: novoEstado || prev.estado,
            cep: cep
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setBuscandoCep(false);
    }
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">Dados do Contratante</h2>
      
      <form className="form-nr13">

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ *</label>
          <div className="cnpj-input-wrapper">
            <input
              id="cnpj"
              name="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj || ""}
              onChange={handleCNPJChange}
              maxLength="18"
              required
              className={cnpjValido === true ? "valid" : cnpjValido === false ? "invalid" : ""}
            />
            {cnpjValido === true && (
              <span className="validation-icon valid-icon">✓</span>
            )}
            {cnpjValido === false && (
              <span className="validation-icon invalid-icon">✗</span>
            )}
          </div>
          {cnpjValido === false && (
            <span className="validation-message invalid-message">CNPJ inválido</span>
          )}
          {cnpjValido === true && (
            <span className="validation-message valid-message">CNPJ válido - dados buscados automaticamente</span>
          )}
          <small className="cnpj-hint">
            Preencha o CNPJ para buscar razão social, endereço, CEP, cidade e estado automaticamente
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="razaoSocial">Razão Social *</label>
          <div className="razao-social-wrapper">
            <input
              id="razaoSocial"
              name="razaoSocial"
              type="text"
              placeholder="Preenchido automaticamente pelo CNPJ"
              value={formData.razaoSocial || ""}
              onChange={handleChange}
              required
            />
            {buscandoRazaoSocial && (
              <span className="loading-razao-social">Buscando...</span>
            )}
            {!buscandoRazaoSocial && formData.cnpj && formData.cnpj.length === 18 && cnpjValido && (
              <button
                type="button"
                className="btn-buscar-cnpj"
                onClick={() => buscarRazaoSocialPorCNPJ(formData.cnpj)}
                title="Buscar dados pelo CNPJ novamente"
              >
                🔍
              </button>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço *</label>
          <input
            id="endereco"
            name="endereco"
            type="text"
            placeholder="Rua Exemplo, 123, Bairro Centro"
            value={formData.endereco || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP (Opcional)</label>
          <div className="cep-input-wrapper">
            <input
              id="cep"
              name="cep"
              type="text"
              placeholder="00000-000"
              value={formData.cep || ""}
              onChange={handleCEPChange}
              maxLength="9"
            />
            {buscandoCep && (
              <span className="loading-cep">Buscando...</span>
            )}
          </div>
          <small className="cep-hint">Preencha o CEP para preencher automaticamente o endereço, cidade e estado (opcional)</small>
        </div>

        <div className="form-row form-row-estado-cidade">
          <div className="form-group">
            <label htmlFor="estado">Estado *</label>
            <select 
              id="estado"
              name="estado" 
              value={formData.estado || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group form-group-cidade">
            <label htmlFor="cidade">Cidade *</label>
            <select
              id="cidade"
              name="cidade"
              value={formData.cidade || ""}
              onChange={handleChange}
              required
              disabled={!formData.estado || loadingCidades}
            >
              <option value="">
                {loadingCidades ? "Carregando..." : !formData.estado ? "Selecione o estado primeiro" : "Selecione a cidade"}
              </option>
              {cidades.map((cidade) => (
                <option key={cidade.id} value={cidade.nome}>
                  {cidade.nome}
                </option>
              ))}
            </select>
            {formData.estado && !loadingCidades && cidades.length > 0 && (
              <small className="cidade-hint">{cidades.length} cidades do estado {formData.estado}</small>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}

