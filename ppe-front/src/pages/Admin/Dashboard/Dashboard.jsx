import styles from "../Dashboard/styles.module.css";
import Title from "../../../components/Title/Title";
import BarrasEmpilhadas from "../../../components/GraficoBarrasEmpilhadas/BarrasEmpilhadas";
import GraficoPizza from "../../../components/GraficoPizza/GraficoPizza";
import { useState, useEffect } from "react";
import fetchData from "../../../utils/fetchData";
import GraficoBarras from "../../../components/GraficoBarras/Barra";
import Taggle from "../../../components/Taggle/Taggle";
import CardDash from "../../../components/CardDash/CardDash";
const baseURL = import.meta.env.VITE_API_BASE_URL;


import {
  startOfWeek,
  endOfWeek,
  parseISO,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const Dashboard = () => {
  const [IdTurma, setIdTurma] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [dataCompetencia, setDataCompetencia] = useState([]);
  const [dataTextos, setDataTextos] = useState([]);
  const [dataPizza, setDataPizza] = useState([]);
  const [usuariosTurma, setUsuariosTurma] = useState([]);
  const [simulados, setSimulados] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([]);
  const [redacoesCorrigidasTurma, setRedacoesCorrigidasTurma] = useState(0);
  const [alunosTurma, setAlunosTurma] = useState(0);
  const [taggle, setTaggle] = useState("Análise Mensal");

  useEffect(() => {
    const loadInitialData = async () => {
      const {
        getTurmas,
        getSimulados,
        getAlunos,
        getRedacoesCorrigidas,
      } = fetchData();

      const turmasData = await getTurmas();
      const simuladosData = await getSimulados();
      const alunosData = await getAlunos();
      const redacoesCorrigidasData = await getRedacoesCorrigidas();

      const turmasFormatadas = turmasData.map((t) => ({
        id: t.id,
        nome: t.nome,
      }));

      setTurmas(turmasFormatadas);
      setSimulados(simuladosData);
      setAlunos(alunosData);
      setRedacoesCorrigidas(redacoesCorrigidasData);

      if (turmasFormatadas.length > 0) {
        setIdTurma(turmasFormatadas[0].id);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!IdTurma) return;

    const fetchAnaliseMensal = async () => {
      const {
        getTurmaById,
        getRedacoes,
        getCorrecoes,
      } = fetchData();

      const inicioMes = startOfMonth(new Date());
      const fimMes = endOfMonth(new Date());

      console.log('Análise Mensal - Período:', {
        inicio: inicioMes.toISOString(),
        fim: fimMes.toISOString()
      });

      const turma = await getTurmaById(IdTurma);
      const redacoes = await getRedacoes();
      const correcoes = await getCorrecoes();
      
      // Atualizar o número de alunos da turma selecionada
      setAlunosTurma(turma.usuarios?.length || 0);
      
      // Debug: Verificar estrutura dos dados
      console.log('Total de redações retornadas:', redacoes.length);
      console.log('Turma selecionada ID:', turma.id);
      console.log('Exemplo de redação:', redacoes[0]);
      
      // Debug: Verificar quantas redações são da turma (sem filtro de data)
      const redacoesDaTurma = redacoes.filter(r => r.usuario?.turma?.id === turma.id);
      console.log('Total de redações da turma (sem filtro de data):', redacoesDaTurma.length);
      
      // Filtrar redações da turma no mês atual
      const redacoesDoMes = redacoes.filter((r) => {
        const data = new Date(r.data);
        const dentroDoMes = data >= inicioMes && data <= fimMes;
        const daTurma = r.usuario?.turma?.id === turma.id;
        
        // Log detalhado para debug
        if (r.usuario?.turma?.id === turma.id) {
          console.log('Redação da turma encontrada:', {
            id: r.id,
            data: r.data,
            dataParsed: data.toISOString(),
            dentroDoMes,
            turmaId: r.usuario.turma.id
          });
        }
        
        return dentroDoMes && daTurma;
      });

      // Filtrar correções da turma no mês atual
      const correcoesDaTurmaNoMes = correcoes.filter((c) => {
        if (!c.redacao?.usuario?.turma?.id || c.redacao.usuario.turma.id !== turma.id) return false;
        const data = new Date(c.redacao.data);
        const dentroDoMes = data >= inicioMes && data <= fimMes;
        
        // Log para debug das correções
        if (c.redacao.usuario.turma.id === turma.id) {
          console.log('Correção da turma encontrada:', {
            id: c.id,
            redacaoData: c.redacao.data,
            dataParsed: data.toISOString(),
            dentroDoMes,
            turmaId: c.redacao.usuario.turma.id
          });
        }
        
        return dentroDoMes;
      });
      
      setRedacoesCorrigidasTurma(correcoesDaTurmaNoMes.length);

      // Análise baseada em redações corrigidas do mês
      const graficoCompetencia = correcoesDaTurmaNoMes.map((c) => ({
        usuarioId: c.redacao.usuario.id,
        competencia01: c.competencia01 || 0,
        competencia02: c.competencia02 || 0,
        competencia03: c.competencia03 || 0,
        competencia04: c.competencia04 || 0,
        competencia05: c.competencia05 || 0,
        nota: c.nota || 0,
      }));

      // Dados específicos para o gráfico de pizza (apenas notas válidas)
      const dadosPizza = correcoesDaTurmaNoMes
        .filter(c => c.nota && c.nota > 0) // Filtrar apenas notas válidas
        .map((c) => ({
          nota: parseFloat(c.nota) || 0,
        }));

      console.log('Dados pizza (Análise Mensal):', dadosPizza);

      // SOLUÇÃO DEFINITIVA: Usar sempre as correções como fonte de dados
      // já que elas contêm a informação completa da redação + usuário + turma
      console.log('Usando correções como fonte principal de dados');
      
      // Extrair redações únicas das correções (evitar duplicatas)
      const redacoesUnicasCorrections = correcoesDaTurmaNoMes.map(c => c.redacao);
      const redacoesUnicasMap = new Map();
      redacoesUnicasCorrections.forEach(r => {
        redacoesUnicasMap.set(r.id, r);
      });
      const redacoesUnicas = Array.from(redacoesUnicasMap.values());

      // Usar sempre os dados das correções (mais confiáveis)
      const redacoesParaAnalise = redacoesUnicas;

      // Calcular produções baseado em redações enviadas no mês (via correções)
      const idsEnviadas = new Set(redacoesParaAnalise.map((r) => r.usuarioId));
      const alunosTurmaArray = turma.usuarios || [];
      const produzidos = alunosTurmaArray.filter((aluno) => idsEnviadas.has(aluno.id)).length;

      console.log('Análise Mensal - Debug Final:');
      console.log('- Total de redações do mês (filtro direto):', redacoesDoMes.length);
      console.log('- Total de redações via correções:', redacoesParaAnalise.length);
      console.log('- Total de correções do mês:', correcoesDaTurmaNoMes.length);
      console.log('- IDs que enviaram redações:', Array.from(idsEnviadas));
      console.log('- Total de alunos na turma:', alunosTurmaArray.length);
      console.log('- Alunos que produziram:', produzidos);

      setDataCompetencia(graficoCompetencia);
      setDataPizza(dadosPizza);
      setDataTextos([
        {
          name: "Produção Mensal",
          produzidos,
          semProducao: alunosTurmaArray.length - produzidos,
        },
      ]);
    };

    const fetchUltimasProducoes = async () => {
      const {
        getTurmaById,
        getCorrecoes,
      } = fetchData();

      const turma = await getTurmaById(IdTurma);
      const correcoes = await getCorrecoes();

      setUsuariosTurma(turma.usuarios || []);
      
      // Atualizar o número de alunos da turma selecionada
      setAlunosTurma(turma.usuarios?.length || 0);

      // Buscar todas as correções da turma
      const correcoesDaTurma = correcoes.filter((c) => {
        return c.redacao?.usuario?.turma?.id === turma.id;
      });

      // Ordenar por data e pegar as últimas 10 correções
      const ultimasCorrecoes = correcoesDaTurma
        .sort((a, b) => {
          const dataA = new Date(a.redacao.data);
          const dataB = new Date(b.redacao.data);
          return dataB - dataA;
        })
        .slice(0, 10);

      setRedacoesCorrigidasTurma(ultimasCorrecoes.length);

      // Análise baseada nas últimas 10 correções
      const graficoCompetencia = ultimasCorrecoes.map((c) => ({
        usuarioId: c.redacao.usuario.id,
        competencia01: c.competencia01 || 0,
        competencia02: c.competencia02 || 0,
        competencia03: c.competencia03 || 0,
        competencia04: c.competencia04 || 0,
        competencia05: c.competencia05 || 0,
        nota: c.nota || 0,
      }));

      // Dados específicos para o gráfico de pizza (apenas notas válidas)
      const dadosPizza = ultimasCorrecoes
        .filter(c => c.nota && c.nota > 0) // Filtrar apenas notas válidas
        .map((c) => ({
          nota: parseFloat(c.nota) || 0,
        }));

      console.log('Dados pizza (Últimas Produções):', dadosPizza);

      const idsUltimasProducoes = new Set(ultimasCorrecoes.map((c) => c.redacao.usuario.id));
      const alunosTurma = turma.usuarios || [];
      const produzidos = idsUltimasProducoes.size;

      setDataCompetencia(graficoCompetencia);
      setDataPizza(dadosPizza);
      setDataTextos([
        {
          name: "Últimas Produções",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ]);

      console.log('Últimas Produções - Correções analisadas:', ultimasCorrecoes.length);
      console.log('Últimas Produções - Alunos únicos:', produzidos);
    };

    const fetchAnaliseSimulados = async () => {
      const {
        getNotaSimulados,
        getSimuladoByIdTurma,
        getTurmaById,
      } = fetchData();

      const inicioMes = startOfMonth(new Date());
      const fimMes = endOfMonth(new Date());

      // Buscar dados de simulados do mês
      const simuladosTurma = await getSimuladoByIdTurma(IdTurma);
      const notasAll = await getNotaSimulados();
      const turma = await getTurmaById(IdTurma);
      
      // Atualizar o número de alunos da turma selecionada
      setAlunosTurma(turma.usuarios?.length || 0);

      const simuladosDoMes = simuladosTurma.filter((simulado) => {
        const data = parseISO(simulado.data);
        return data >= inicioMes && data <= fimMes;
      });

      const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

      const notasSimulados = notasAll
        .filter((nota) => idsSimuladosMes.includes(nota.simuladoId))
        .map((n) => ({
          usuarioId: n.usuarioId,
          competencia01: n.competencia01,
          competencia02: n.competencia02,
          competencia03: n.competencia03,
          competencia04: n.competencia04,
          competencia05: n.competencia05,
          nota: n.notaGeral,
        }));

      // Dados específicos para o gráfico de pizza (apenas notas válidas)
      const dadosPizza = notasSimulados
        .filter(n => n.nota && n.nota > 0) // Filtrar apenas notas válidas
        .map((n) => ({
          nota: parseFloat(n.nota) || 0,
        }));

      console.log('Dados pizza (Análise Simulados):', dadosPizza);

      // Contar simulados realizados (notas registradas)
      setRedacoesCorrigidasTurma(notasSimulados.length);

      // Análise baseada em notas de simulados do mês
      const idsComSimulado = new Set(notasSimulados.map((n) => n.usuarioId));
      const alunosTurma = turma.usuarios || [];
      const produzidos = alunosTurma.filter((aluno) => idsComSimulado.has(aluno.id)).length;

      setDataCompetencia(notasSimulados);
      setDataPizza(dadosPizza);
      setDataTextos([
        {
          name: "Simulados do Mês",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ]);

      console.log('Análise Simulados - Simulados realizados:', notasSimulados.length);
      console.log('Análise Simulados - Alunos que fizeram simulados:', produzidos);
    };

    // Executar a análise baseada no toggle selecionado
    if (taggle === "Análise Mensal") {
      fetchAnaliseMensal();
    } else if (taggle === "Últimas Produções") {
      fetchUltimasProducoes();
    } else if (taggle === "Análise de Simulados") {
      fetchAnaliseSimulados();
    }
  }, [IdTurma, taggle]);

  // Função para obter o título do gráfico baseado no toggle
  const getTituloGrafico = () => {
    switch (taggle) {
      case "Análise Mensal":
        return "Análise de Redações do Mês";
      case "Últimas Produções":
        return "Análise das Últimas Produções";
      case "Análise de Simulados":
        return "Análise de Simulados do Mês";
      default:
        return "Análise de Textos Produzidos";
    }
  };

  // Debug: Log dos dados antes de renderizar
  console.log('Estado atual dataPizza:', dataPizza);
  console.log('Taggle atual:', taggle);

  return (
    <div className={styles.container}>
      <Title title="Dashboard" />
      <div className={styles.container_desenpenho}>
        <div className={styles.CardDashs_container}>
          <CardDash title="Total de alunos" content={alunosTurma} color="#1A1A1A" />
          <CardDash title="Total de turmas" content={turmas.length} color="#1A1A1A" />
          <CardDash title="Total de simulados" content={simulados.length} color="#1A1A1A" />
          <CardDash title="Redações corrigidas" content={redacoesCorrigidasTurma} color="#1A1A1A" />
        </div>

        <div className={styles.selects}>
          <div className={styles.taggle}>
            <Taggle 
              data1="Análise Mensal" 
              data2="Últimas Produções" 
              data3="Análise de Simulados"
              setTaggle={setTaggle} 
            />
          </div>
          <div className={styles.select_turma}>
            <select value={IdTurma || ""} onChange={(e) => setIdTurma(e.target.value)}>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.container_graficos}>
          <div className={styles.left}>
            <h3>Análise de Desempenho por competências</h3>
            <BarrasEmpilhadas data={dataCompetencia} />
            <GraficoBarras data={dataTextos} titulo={getTituloGrafico()} />
          </div>
          <div className={styles.right}>
            <div className={styles.grafico_pizza}>
              <GraficoPizza data={dataPizza} titulo="Análise de Desempenho por Notas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
